import numpy as np

from solver.src.entropy import get_pattern_distributions, entropy_of_distributions, get_entropies, get_bucket_counts
from solver.src.generate import get_pattern, get_possible_words, get_word_buckets
from solver.src.data import load_words

def get_weights(words: list[str], freq: dict[str, float]) -> np.ndarray:
    freq: np.ndarray = np.array([freq[word] for word in words])
    total = freq.sum()
    if total == 0:
        return np.zeros(freq.shape)
    return freq / total
