import numpy as np
from numpy.typing import NDArray

from solver.src.entropy import get_pattern_distributions, entropy_of_distributions, get_entropies, get_bucket_counts
from solver.src.generate import get_pattern, get_possible_words, get_word_buckets
from solver.src.data import load_words

def get_weights(words: list[str], freq: dict[str, float]) -> NDArray[np.float32]:
    freq_vals = np.array([freq[word] for word in words])
    total = freq_vals.sum()
    if total == 0:
        return np.zeros(freq.shape)
    return freq / total

def find_optimal_guess(
    allowed: list[str],
    solutions: list[str],
    freq: dict[str, float],
    *,
    maximize_entropy: bool = False
) -> str:
    if maximize_entropy:
        if len(solutions) == 1:
            return solutions[0]
        weights = get_weights(solutions, freq)
        entropies = get_entropies(allowed, solutions, weights)
        return solutions[np.argmax(entropies)]