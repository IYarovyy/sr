from os.path import dirname, join

MAIN_DIRECTORY = dirname(dirname(__file__))


def get_full_path(*path):
    print(f"MAIN_DIRECTORY: {MAIN_DIRECTORY}")
    return join(MAIN_DIRECTORY, *path)
