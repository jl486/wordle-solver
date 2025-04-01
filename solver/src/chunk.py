CHUNK_SIZE = 13000

def chunks(list, n):
    for i in range(0, len(list), n):
        yield list[i:i + n]
