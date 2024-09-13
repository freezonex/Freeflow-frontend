# Define default RUNTIME_IDC_NAME value
RUNTIME_IDC_NAME ?= sg

# Define default target
.PHONY: all frontend

# Set default target to 'frontend'
all: frontend

# Define 'frontend' target for building Docker image
frontend:
	docker build --platform=linux/amd64 --build-arg RUNTIME_IDC_NAME=$(RUNTIME_IDC_NAME) -t openiiot-consolemanager:1.0.0 .
