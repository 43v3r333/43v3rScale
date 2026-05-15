class InferenceAgent:
    @staticmethod
    async def prelabel_cv(file_content: bytes) -> dict:
        # Mock SAM 3 segmentation mask generation
        return {"mask_url": "mock://sam3/mask_01.png", "confidence": 0.98}

    @staticmethod
    async def prelabel_rlhf(text_content: str) -> dict:
        # Mock Gemini 3 Flash baseline critique
        return {"critique": "Baseline ranking: A > B. Reason: Better coherence.", "confidence": 0.95}

inference_agent = InferenceAgent()
