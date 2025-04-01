import numpy as np
from scipy.stats import entropy

from pattern import generate_pattern_matrix

def pattern_distributions(allowed: list[str], solutions: list[str], weights: np.ndarray) -> np.ndarray:
    similarity: np.ndarray = generate_pattern_matrix(allowed, solutions)
    
    distributions: np.ndarray = np.zeros((len(allowed), 3**5))
    np.add.at(distributions, (np.arange(len(allowed)), similarity), weights)

    return distributions
