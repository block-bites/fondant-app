import pytest
import subprocess
import testinfra
import time

# scope='session' uses the same container for all the tests;
# scope='function' uses a new container per test function.
@pytest.fixture(scope="session")
def image(pytestconfig):
    return pytestconfig.getoption("image")

@pytest.fixture(scope='session')
def host(request,pytestconfig):
    # run a container
    docker_id = subprocess.check_output(
        ['docker', 'run', '-d', pytestconfig.getoption('image')]).decode().strip()
    # wait until it's running'
    output = subprocess.check_output(['docker', 'inspect', '-f "{{.State.Health.Status}}"', docker_id]).decode().strip(' \n\t\"')
    retries=12
    while "healthy" != output and retries>=0:
        time.sleep(5)
        retries-=1
        output = subprocess.check_output(['docker', 'inspect', '-f "{{.State.Health.Status}}"', docker_id]).decode().strip(' \n\t\"')
    # return a testinfra connection to the container
    yield testinfra.get_host("docker://" + docker_id)
    # at the end of the test suite, destroy the container
    subprocess.check_call(['docker', 'rm', '-f', docker_id])

def test_user_is_present(host):
    user_name = 'casper'
    group_name = 'casper'
    home_dir = '/home/casper'
    shell = '/bin/bash'

    usr = host.user(user_name)
    assert user_name in usr.name
    assert group_name in usr.group
    assert home_dir in usr.home
    assert shell in usr.shell

def test_root_is_present(host):
    user_name = 'root'
    group_name = 'root'
    home_dir = '/root'
    shell = '/bin/bash'

    usr = host.user(user_name)
    assert user_name in usr.name
    assert group_name in usr.group
    assert home_dir in usr.home
    assert shell in usr.shell

def test_sudo_is_enabled(host):

    response = host.check_output('sudo whoami')
    assert response == 'root'    

def test_assets_are_present(host):

    assert host.file("/home/casper/net-1-predefined-accounts.tar.gz").exists
    assert host.file("/home/casper/restart.sh").exists

def test_casper_client_is_present(host):

    cmd = host.run("/home/casper/casper-client-rs/target/release/casper-client --help")
    assert cmd.rc == 0

def test_rpc_is_responsive(host):

    cmd = host.run('/bin/bash -i -c "source /home/casper/casper-node/utils/nctl/sh/views/view_node_status.sh node=1"')
    assert cmd.rc == 0

def test_five_nodes_are_running(host):

    response = host.check_output('/bin/bash -i -c "nctl-status | grep -c RUNNING" | tail -1')
    assert response == '5'

def test_nctl_commands_are_activated(host):

     cmd = host.run('/bin/bash -i -c "nctl-status"')
     assert cmd.rc == 0

def test_environment_home(host):
    assert host.environment().get("NCTL") == "/home/casper/casper-node/utils/nctl"
    assert host.environment().get("NCTL_CASPER_HOME") == "/home/casper/casper-node"
    assert host.environment().get("NCTL_CASPER_NODE_LAUNCHER_HOME") == "/home/casper/casper-node-launcher"
