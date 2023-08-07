import pytest

def pytest_addoption(parser):
    parser.addoption("--image", action="store", default="makesoftware/casper-nctl")
