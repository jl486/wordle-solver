from pathlib import Path
import numpy as np
from scipy.stats import entropy

data_dir = (Path(__file__).resolve().parent.parent / 'data').resolve()
guesses_file = data_dir / 'guesses.txt'
solutions_file = data_dir / 'solutions.txt'

def load_words(solutions=False):
    words: list[str] = []
    file = solutions_file if solutions else guesses_file
    with file.open('r') as f:
        words.extend([word.strip() for word in f.readlines()])
    return words

def test():
    pk = np.array([0.5, 0.5])
    H = entropy(pk, base=2)
    return H

print(test())
