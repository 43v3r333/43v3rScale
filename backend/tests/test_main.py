from fastapi.testclient import TestClient
from app.main import app
from app.core.db import get_session
from unittest.mock import MagicMock

client = TestClient(app)

# Mock session
def override_get_session():
    mock_session = MagicMock()
    yield mock_session

app.dependency_overrides[get_session] = override_get_session

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to 43v3rScale API"}

def test_webhook_label_studio():
    payload = {
        "action": "ANNOTATION_CREATED",
        "annotation": {"result": [{"id": "1", "type": "choices", "value": {"choices": ["Dog"]}}]},
        "task": {"id": 123}
    }
    response = client.post("/api/v1/webhooks/label-studio", json=payload)
    assert response.status_code == 200
    assert response.json() == {"status": "success"}
