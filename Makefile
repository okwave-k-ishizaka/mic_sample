setup:
	docker build -f build/backend/Dockerfile -t mic_sample:backend . ; docker build -f build/frontend/Dockerfile -t mic_sample:frontend .
