import mimetypes
import httpx
from typing import Optional

class RouterService:
    @staticmethod
    def identify_modal(filename: str) -> str:
        mime_type, _ = mimetypes.guess_type(filename)
        ext = filename.split('.')[-1].lower()

        if ext in ['mp4', 'pcd'] or (mime_type and mime_type.startswith('image/')):
            return "CVAT"
        if ext in ['json', 'txt']:
            return "Label Studio"
        return "Label Studio"

    @staticmethod
    async def create_external_project(modal: str, name: str) -> Optional[str]:
        # Placeholder for external API calls to CVAT/Label Studio
        print(f"Creating project {name} in {modal}")
        return f"ext_{modal.lower()}_{name}"

router_service = RouterService()
