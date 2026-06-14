import os
import subprocess
import asyncio
import json
import edge_tts

# Define the narrative segments
SPEECH_SEGMENTS = [
    (
        "landing",
        "Welcome to PulseRank AI, the reasoning recruiter for the post resume era. Traditional applicant tracking systems are broken. Keyword matching treats candidates simply as bags of words, favoring those who copy paste exact keywords. PulseRank solves this by running an adversarial reasoning tournament to rank candidates based on real engineering signals."
    ),
    (
        "launch",
        "Let's launch the application and enter the recruiter workspace dashboard."
    ),
    (
        "sliders",
        "On our workspace, you can see the parsed job description and requirement graph. As we adjust the semantic fit and risk analysis sliders, the ELO ratings and tournament brackets update instantly."
    ),
    (
        "inspect",
        "Let's select our top candidate, Marcus Chen. We can inspect his structured eight factor scorecard, skill map, and risk flags."
    ),
    (
        "export_outro",
        "Finally, we can export the shortlisted candidates directly to CSV. PulseRank AI is built on React, TypeScript, and custom vanilla CSS, sorting one thousand candidate profiles in under thirteen seconds. Thank you."
    )
]

async def main():
    voice = "en-US-BrianNeural"
    checkpoint_timings = {}
    temp_files = []
    
    print("Generating speech segments...")
    for idx, (name, text) in enumerate(SPEECH_SEGMENTS):
        filename = f"seg_pre_{idx}_{name}.mp3"
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(filename)
        temp_files.append(filename)
        
        # Get actual duration
        cmd = [
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1", filename
        ]
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        duration = float(result.stdout.strip())
        checkpoint_timings[name] = duration
        print(f"Segment '{name}': {duration:.2f} seconds.")

    # Concat audio files
    combined_audio = "final_pre_timed_voiceover.mp3"
    audio_list_file = "concat_audio_list.txt"
    with open(audio_list_file, "w") as f:
        for filename in temp_files:
            f.write(f"file '{filename}'\n")
            
    cmd_audio_concat = [
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", audio_list_file,
        "-c:a", "libmp3lame",
        combined_audio
    ]
    subprocess.run(cmd_audio_concat, check=True)
    print(f"Combined audio generated: {combined_audio}")
    
    # Save checkpoint timings to JSON file
    with open("checkpoint_timings.json", "w") as f:
        json.dump(checkpoint_timings, f, indent=4)
    print("Checkpoint timings saved to checkpoint_timings.json.")
    
    # Clean up segments
    os.remove(audio_list_file)
    for filename in temp_files:
        try:
            os.remove(filename)
        except:
            pass

if __name__ == "__main__":
    asyncio.run(main())
