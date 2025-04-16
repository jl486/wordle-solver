import numpy as np
from numpy.typing import NDArray
from itertools import product
from enum import Enum

from solver.src.data import *

class State(Enum):
    GRAY = np.uint8(0)
    YELLOW = np.uint8(1)
    GREEN = np.uint8(2)

class Pattern:
    """
    Word comparison patterns between two lists of words.

    Args:
        words1 (list[str]): First list of words to compare.
        words2 (list[str]): Second list of words to compare.
        length (int): Length of each word.
    """
    def __init__(self, words1: list[str], words2: list[str], length: int = 5):
        self.words1 = words1
        self.words2 = words2
        self.length = length
    
    def generate_matrix(self) -> NDArray[np.uint8]:
        """
        Generates a matrix of all combinations of comparisons between the word lists.

        Returns:
            NDArray[np.uint8]: `(self.length, self.length)` shaped matrix of all combinations of comparisons.
        """
        p_words1, p_words2 = map(self._parse_words, (self.words1, self.words2))
        equality_matrix = p_words1[:, None, :, None] == p_words2[None, :, None, :]
        pattern_matrix = np.zeros(
            (len(self.words1), len(self.words2), self.length),
            dtype=np.uint8
        )

        diag_matches = equality_matrix[:, :, np.arange(self.length), np.arange(self.length)]

        # Green pass
        pattern_matrix[diag_matches] = State.GREEN
        equality_matrix[:, :, :, np.arange(self.length)] &= ~diag_matches[..., None]
        equality_matrix[:, :, np.arange(self.length), :] &= ~diag_matches[..., None, :]

        # Yellow pass
        for i, j in product(range(self.length), range(self.length)):
            is_match = equality_matrix[:, :, i, j].reshape(-1)
            
            pattern_matrix[:, :, i].flat[is_match] = State.YELLOW
            
            # Update equality_matrix for all k at once
            equality_matrix[:, :, :, j].reshape(-1, self.length)[is_match, :] = False
            equality_matrix[:, :, i, :].reshape(-1, self.length)[is_match, :] = False
    
        # Convert each list of numbers to a single int by reading them as a ternary number
        return np.dot(pattern_matrix, (3**np.arange(self.length)).astype(np.uint8))
    
    def as_ints(pattern: int) -> NDArray[np.uint8]:
        return np.array([(pattern // (3**i)) % 3 for i in range(5)])
    
    def _parse_words(words: list[str]) -> NDArray[np.uint8]:
        return np.array([[ord(c) for c in w] for w in words], dtype=np.uint8)

def pattern_from_string(pattern: str) -> int:
    return sum((3**i) * int(c) for i, c in enumerate(pattern))

