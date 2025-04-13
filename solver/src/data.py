from pathlib import Path
import json
import numpy as np

data_dir = (Path(__file__).resolve().parent.parent.parent / 'data').resolve()
guesses_file = data_dir / 'guesses.txt'
solutions_file = data_dir / 'solutions.txt'
pattern_matrix_file = data_dir / 'pattern_matrix.npy'
word_freq_file = data_dir / 'freq.json'

def load_words(solutions: bool = False) -> list[str]:
    words: list[str] = []
    file: Path = solutions_file if solutions else guesses_file
    with file.open('r') as f:
        words.extend([word.strip() for word in f.readlines()])
    return words
