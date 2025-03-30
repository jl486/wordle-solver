import numpy as np
from itertools import product

GRAY = np.uint8(0)
YELLOW = np.uint8(1)
GREEN = np.uint8(2)

def parse_words(words: list[str]) -> np.ndarray:
    return np.array([[ord(c) for c in w] for w in words], dtype=np.uint8)

def similarity_vector(words1: list[str], words2: list[str], length: int = 5) -> np.ndarray:
    parsed_words1, parsed_words2 = map(parse_words, (words1, words2))

    equality_matrix = parsed_words1[:, None, :, None] == parsed_words2[None, :, None, :]
    similarity_matrix: np.ndarray = np.zeros((len(words1), len(words2), length), dtype=np.uint8)

    diag_matches = equality_matrix[:, :, np.arange(length), np.arange(length)]  # shape (n, m, num_letters)

    # Green pass
    similarity_matrix[diag_matches] = GREEN
    equality_matrix[:, :, :, np.arange(length)] &= ~diag_matches[..., None]
    equality_matrix[:, :, np.arange(length), :] &= ~diag_matches[..., None, :]

    # Yellow pass
    for i, j in product(range(length), range(length)):
        is_match = equality_matrix[:, :, i, j].reshape(-1)
        
        similarity_matrix[:, :, i].flat[is_match] = YELLOW
        
        # Update equality_matrix for all k at once
        equality_matrix[:, :, :, j].reshape(-1, length)[is_match, :] = False
        equality_matrix[:, :, i, :].reshape(-1, length)[is_match, :] = False
    
    # Convert each list of numbers to a single int by treating them as a ternary number
    return np.dot(similarity_matrix, (3 ** np.arange(length)).astype(np.uint8))

