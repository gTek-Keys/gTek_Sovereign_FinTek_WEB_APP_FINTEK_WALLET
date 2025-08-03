# stream_test.py

import subprocess

def stream_audio_to_blackhole(audio_path):
    command = [
        'ffmpeg',
        '-re',
        '-i', audio_path,
        '-f', 'coreaudio',
        'BlackHole 16ch'
    ]
    subprocess.run(command)

if __name__ == "__main__":
    test_audio = "sample.mp3"  # Place a test audio file named sample.mp3 in the same folder
    stream_audio_to_blackhole(test_audio)
