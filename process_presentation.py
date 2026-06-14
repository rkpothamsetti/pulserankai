import os
import subprocess
import asyncio
from PIL import Image
import edge_tts

# Define the presentation timeline segments:
# (Segment Name, Speech Text, Target Visual Duration in seconds)
TIMELINE = [
    (
        "landing",
        "Welcome to PulseRank AI, the reasoning recruiter for the post resume era. Traditional applicant tracking systems are broken. Keyword matching treats candidates simply as bags of words, favoring those who copy paste exact keywords. PulseRank solves this by running an adversarial reasoning tournament to rank candidates based on real engineering signals.",
        22.0
    ),
    (
        "launch",
        "Let's launch the application and enter the recruiter workspace dashboard.",
        4.4
    ),
    (
        "sliders",
        "On our workspace, you can see the parsed job description and requirement graph. As we adjust the semantic fit and risk analysis sliders, the ELO ratings and tournament brackets update instantly.",
        12.0
    ),
    (
        "inspect",
        "Let's select our top candidate, Marcus Chen. We can inspect his structured eight factor scorecard, skill map, and risk flags.",
        8.3
    ),
    (
        "export_outro",
        "Finally, we can export the shortlisted candidates directly to CSV. PulseRank AI is built on React, TypeScript, and custom vanilla CSS, sorting one thousand candidate profiles in under thirteen seconds. Thank you.",
        15.2
    )
]

async def generate_segment_audio(text, output_path, target_duration):
    voice = "en-US-BrianNeural" # Natural male voice
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output_path)
    
    # Check the actual duration of the generated audio using ffprobe
    cmd = [
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", output_path
    ]
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    actual_duration = float(result.stdout.strip())
    print(f"Generated {output_path}: text duration is {actual_duration:.2f}s (target: {target_duration}s)")
    
    # Pad with silence if the audio is shorter than the target duration.
    # If the audio is longer, we speed it up slightly.
    padded_path = output_path.replace(".mp3", "_padded.mp3")
    if actual_duration < target_duration:
        silence_needed = target_duration - actual_duration
        print(f"Padding {output_path} with {silence_needed:.2f}s of silence...")
        # ffmpeg filter to pad audio with silence at the end
        cmd_pad = [
            "ffmpeg", "-y", "-i", output_path,
            "-filter_complex", f"aevalsrc=0:d={silence_needed}[sil];[0:a][sil]concat=n=2:v=0:a=1",
            "-ar", "24000", padded_path
        ]
        subprocess.run(cmd_pad, check=True)
    else:
        # Speed up audio slightly to fit target_duration
        tempo = actual_duration / target_duration
        print(f"Speeding up {output_path} by factor {tempo:.2f}x to fit target...")
        cmd_speed = [
            "ffmpeg", "-y", "-i", output_path,
            "-filter_complex", f"atempo={tempo}",
            "-ar", "24000", padded_path
        ]
        subprocess.run(cmd_speed, check=True)
    
    return padded_path

def main():
    webp_path = "pulserank_final_timed_walkthrough.webp"
    temp_dir = "temp_frames"
    os.makedirs(temp_dir, exist_ok=True)

    print("Step 1: Extracting frames from WebP...")
    im = Image.open(webp_path)
    
    frame_list_file = "ffmpeg_concat.txt"
    frames = []
    
    # Extract frames and write concat text file
    frame_idx = 0
    try:
        while True:
            frame_filename = os.path.join(temp_dir, f"frame_{frame_idx:05d}.png")
            frame_rgb = im.convert("RGB")
            frame_rgb.save(frame_filename)
            
            duration_sec = im.info.get("duration", 100) / 1000.0
            frames.append((frame_filename, duration_sec))
            
            frame_idx += 1
            im.seek(im.tell() + 1)
    except EOFError:
        pass

    print(f"Extracted {frame_idx} frames.")

    # Write concat list for ffmpeg
    with open(frame_list_file, "w") as f:
        for filename, duration in frames:
            escaped_path = filename.replace("\\", "/")
            f.write(f"file '{escaped_path}'\n")
            f.write(f"duration {duration}\n")
        if frames:
            escaped_path = frames[-1][0].replace("\\", "/")
            f.write(f"file '{escaped_path}'\n")

    print("Step 2: Compiling frames to silent video using ffmpeg...")
    video_only_mp4 = "video_only.mp4"
    cmd_video = [
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", frame_list_file,
        "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        video_only_mp4
    ]
    subprocess.run(cmd_video, check=True)
    print("Silent video compiled successfully.")

    print("Step 3: Generating and Aligning Text-To-Speech segments...")
    padded_audios = []
    
    async def generate_all_segments():
        for i, (name, text, duration) in enumerate(TIMELINE):
            raw_path = f"seg_{i}_{name}.mp3"
            padded_path = await generate_segment_audio(text, raw_path, duration)
            padded_audios.append(padded_path)
            # Remove the raw unpadded file
            try:
                os.remove(raw_path)
            except:
                pass

    asyncio.run(generate_all_segments())

    print("Step 4: Concatenating audio segments...")
    combined_audio = "combined_voiceover.mp3"
    
    # Create input list for audio concat
    audio_list_file = "ffmpeg_audio_list.txt"
    with open(audio_list_file, "w") as f:
        for audio_path in padded_audios:
            escaped_path = audio_path.replace("\\", "/")
            f.write(f"file '{escaped_path}'\n")
            
    cmd_audio_concat = [
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", audio_list_file,
        "-c:a", "libmp3lame",
        combined_audio
    ]
    subprocess.run(cmd_audio_concat, check=True)
    print("Audio segments concatenated successfully.")

    print("Step 5: Merging video and aligned audio...")
    final_output_mp4 = "pulserank_pitch_presentation.mp4"
    
    cmd_merge = [
        "ffmpeg", "-y",
        "-i", video_only_mp4,
        "-i", combined_audio,
        "-c:v", "copy",
        "-c:a", "aac",
        "-shortest",
        final_output_mp4
    ]
    subprocess.run(cmd_merge, check=True)
    print(f"Presentation video merged and saved as {final_output_mp4}!")

    # Clean up temp files
    try:
        os.remove(frame_list_file)
        os.remove(video_only_mp4)
        os.remove(combined_audio)
        os.remove(audio_list_file)
        for audio_path in padded_audios:
            os.remove(audio_path)
        for filename, _ in frames:
            os.remove(filename)
        os.rmdir(temp_dir)
        print("Temporary files cleaned up.")
    except Exception as e:
        print(f"Cleanup warning: {e}")

if __name__ == "__main__":
    main()
