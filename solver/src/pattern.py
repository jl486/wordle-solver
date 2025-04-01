import numpy as np
from itertools import product, count
from enum import Enum

from file import *
from chunk import chunks

pattern_grid_data = dict()

class State(Enum):
    GRAY = np.uint8(0)
    YELLOW = np.uint8(1)
    GREEN = np.uint8(2)

def parse_words(words: list[str]) -> np.ndarray:
    return np.array([[ord(c) for c in w] for w in words], dtype=np.uint8)

def generate_pattern_matrix(words1: list[str], words2: list[str], length: int = 5) -> np.ndarray:
    parsed_words1, parsed_words2 = map(parse_words, (words1, words2))

    equality_matrix = parsed_words1[:, None, :, None] == parsed_words2[None, :, None, :]
    pattern_mat: np.ndarray = np.zeros((len(words1), len(words2), length), dtype=np.uint8)

    diag_matches = equality_matrix[:, :, np.arange(length), np.arange(length)]

    # Green pass
    pattern_mat[diag_matches] = State.GREEN
    equality_matrix[:, :, :, np.arange(length)] &= ~diag_matches[..., None]
    equality_matrix[:, :, np.arange(length), :] &= ~diag_matches[..., None, :]

    # Yellow pass
    for i, j in product(range(length), range(length)):
        is_match = equality_matrix[:, :, i, j].reshape(-1)
        
        pattern_mat[:, :, i].flat[is_match] = State.YELLOW
        
        # Update equality_matrix for all k at once
        equality_matrix[:, :, :, j].reshape(-1, length)[is_match, :] = False
        equality_matrix[:, :, i, :].reshape(-1, length)[is_match, :] = False
    
    # Convert each list of numbers to a single int by treating them as a ternary number
    return np.dot(pattern_mat, (3**np.arange(length)).astype(np.uint8))

def generate_full_pattern_matrix_in_chunks(words: list[str], length: int = 13000) -> np.ndarray:
    block_matrix: np.ndarray = None
    for words1 in chunks(words, length):
        row = None
        for words2 in chunks(words, length):
            block = generate_pattern_matrix(words1, words2)
            row = np.hstack((row, block) if row is not None else block)
        
        block_matrix = (np.vstack(block_matrix, row) if block_matrix is not None else row)

    return block_matrix

def generate_full_pattern_matrix() -> np.ndarray:
    words: list[str] = load_words()
    pattern_matrix: np.ndarray = generate_full_pattern_matrix(words)
    np.save(pattern_matrix_file, pattern_matrix)
    return pattern_matrix

def get_pattern_matrix(words1: list[str], words2: list[str]) -> np.ndarray:
    if not pattern_grid_data:
        if not pattern_matrix_file:
            generate_full_pattern_matrix()

        pattern_grid_data['grid'] = np.load(pattern_matrix_file)
        pattern_grid_data['word_indices'] = dict(zip(
            load_words(), count()
        ))

    full_grid: np.ndarray = pattern_grid_data['grid']
    word_indices: dict[str, int] = pattern_grid_data['word_indices']

    indices1: list[int] = [word_indices[w] for w in words1]
    indices2: list[int] = [word_indices[w] for w in words2]
    return full_grid[np.ix_(indices1, indices2)]

def get_pattern(guess: str, answer: str) -> int:
    if pattern_grid_data:
        saved_words: dict[str, int] = pattern_grid_data['word_indices']
        if guess in saved_words and answer in saved_words:
            return get_pattern_matrix([guess], [answer])[0, 0]
    return generate_pattern_matrix([guess], [answer])[0, 0]

def pattern_from_string(pattern: str) -> int:
    return sum((3**i) * int(c) for i, c in enumerate(pattern))

def pattern_to_int_list(pattern) -> list[int]:
    return [(pattern // (3**i)) % 3 for i in range(5)]

def get_possible_words(guess: str, pattern: int, word_list: list[str]) -> list[int]:
    all_patterns: np.ndarray = get_pattern_matrix([guess], word_list).flatten()
    return [word for word, pat in zip(word_list, all_patterns) if pat == pattern]

def get_word_buckets(guess: str, solutions: list[str]) -> list[list[str]]:
    buckets: list[list[str]] = [[] for _ in range(3**5)]
    hashes: np.ndarray = get_pattern_matrix([guess], solutions).flatten()
    for i, word in zip(hashes, solutions):
        buckets[i].append(word)
    return buckets
