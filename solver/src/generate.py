import numpy as np
from itertools import count
from typing import Any

from solver.src.data import *
from solver.src.pattern import Pattern
from solver.src.chunk import chunks

pattern_grid_data: dict[str, Any] = dict()

def generate_full_pattern(
    words: list[str] = None,
    chunk_size: int = 13000,
    save: bool = True
) -> Pattern:
    """
    Generates the full pattern matrix comparing all words against themselves.

    Args:
        words (list[str]): List of words to compare. If `None`, words will be automatically loaded.
        chunk_size (int): Number of words to process at once.
        save (bool): Save the matrix as a separate file.
    
    Returns:
        Pattern: Initialized with word list.
    """
    if words is None:
        words = load_words()

    pattern = Pattern(words, words, length=5)
    chunk_matrix = None
    for words1 in chunks(words, chunk_size):
        row = None
        for words2 in chunks(words, chunk_size):
            chunk_pattern = Pattern(words1, words2)
            chunk = chunk_pattern.generate_matrix()
            row = np.hstack([row, chunk]) if row is not None else chunk
        
        chunk_matrix = np.vstack([chunk_matrix, row]) if chunk_matrix is not None else row
    
    if save:
        np.save(pattern_matrix_file, chunk_matrix)
    
    return pattern

def get_pattern_matrix(words1: list[str], words2: list[str], pattern_grid_data: dict[str, Any]) -> np.ndarray:
    """
    Gets the pattern matrix between two lists of words and 
    """
    if not pattern_grid_data:
        if not pattern_matrix_file:
            generate_full_pattern()

        pattern_grid_data['grid'] = np.load(pattern_matrix_file)
        pattern_grid_data['word_indices'] = dict(zip(
            load_words(), count()
        ))

    full_grid = pattern_grid_data['grid']
    word_indices = pattern_grid_data['word_indices']

    indices1 = [word_indices[w] for w in words1]
    indices2 = [word_indices[w] for w in words2]
    return full_grid[np.ix_(indices1, indices2)]

def get_pattern(guess: str, answer: str) -> int:
    if pattern_grid_data:
        saved_words = pattern_grid_data['word_indices']
        if guess in saved_words and answer in saved_words:
            return get_pattern_matrix([guess], [answer])[0, 0]
    return Pattern(guess, answer, length=5).generate_matrix()[0, 0]

def get_possible_words(guess: str, pattern: int, word_list: list[str]) -> list[int]:
    all_patterns = get_pattern_matrix([guess], word_list).flatten()
    return [word for word, pat in zip(word_list, all_patterns) if pat == pattern]

def get_word_buckets(guess: str, solutions: list[str]) -> list[list[str]]:
    buckets = [[] for _ in range(3**5)]
    hashes: np.ndarray = get_pattern_matrix([guess], solutions).flatten()
    for i, word in zip(hashes, solutions):
        buckets[i].append(word)
    return buckets