import numpy as np
from scipy.stats import entropy

from solver.src.pattern import Pattern

def get_pattern_distributions(allowed: list[str], solutions: list[str], weights: np.ndarray) -> np.ndarray:
    similarity: np.ndarray = Pattern(allowed, solutions, length=5).generate_matrix()
    
    distributions: np.ndarray = np.zeros((len(allowed), 3**5))
    np.add.at(distributions, (np.arange(len(allowed)), similarity), weights)

    return distributions

def entropy_of_distributions(distributions: np.ndarray) -> float:
    axis: int = len(distributions.shape) - 1
    return entropy(distributions, base=2, axis=axis)

def get_entropies(allowed: list[str], solutions: list[str], weights: np.ndarray):
    if weights.sum() == 0:
        return np.zeros(len(allowed))
    
    distributions: np.ndarray = get_pattern_distributions(allowed, solutions, weights)
    return entropy_of_distributions(distributions)

def get_bucket_sizes(allowed: list[str], solutions: list[str]) -> np.ndarray:
    weights = np.ones(len(solutions))
    return get_pattern_distributions(allowed, solutions, weights)

def get_bucket_counts(allowed: list[str], solutions: list[str]) -> np.uint32:
    bucket_sizes = get_bucket_sizes(allowed, solutions)
    return np.sum(bucket_sizes > 0, axis=1, dtype=np.uint32)