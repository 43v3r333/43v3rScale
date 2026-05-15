import mimetypes

class TaskRouter:
    @staticmethod
    def route_task(filename: str) -> str:
        mime_type, _ = mimetypes.guess_type(filename)

        if mime_type:
            if mime_type.startswith('image/') or mime_type.startswith('video/'):
                return "CVAT"
            elif mime_type == 'application/json' or mime_type.startswith('text/'):
                return "Label Studio"

        # Default fallback
        return "Label Studio"

task_router = TaskRouter()
