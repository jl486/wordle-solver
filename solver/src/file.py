from pathlib import Path

data_dir = (Path(__file__).resolve().parent.parent / 'data').resolve()
guesses_file = data_dir / 'guesses.txt'
solutions_file = data_dir / 'solutions.txt'

def load_words(solutions: bool = False) -> list[str]:
    words: list[str] = []
    file: Path = solutions_file if solutions else guesses_file
    with file.open('r') as f:
        words.extend([word.strip() for word in f.readlines()])
    return words
