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

def get_freq() -> dict[str, float]:
    freq_fname = word_freq_file
    if Path(freq_fname).exists():
        with Path(freq_fname).open(encoding='utf8') as f:
            return json.load(f)
    return dict()

def get_adjusted_freq(n_common: int = 3000, x_width: int = 10):
    """
    Associates the probability that a word will be selected as the solution.
    This is meant to simulate how the solutions are curated by a human.

    Args:
        n_common (int): Mumber of most common words.
        x_width (int): Spread of the linearly-spaced list of words.
    """
    freq = get_freq()
    words = np.array(list(freq.keys()))
    freq_vals = np.array([freq[w] for w in words])
    sorted_words = words[freq_vals.argsort()]

    c = x_width * (-0.5 + n_common / len(words))
    x = np.linspace(c - x_width / 2, c + x_width / 2, len(words))
    sigmoid_x = 1 / (1 + np.exp(-x))
    return dict(zip(sorted_words, sigmoid_x))