# Label Studio Mock Sample

This folder contains a sample import file for Label Studio.

## How to import

1. Open Label Studio in your browser at `http://localhost:8080`.
2. Create a new project or open an existing one.
3. Go to **Import** > **Import tasks**.
4. Upload `mock_sample.json`.
5. Ensure your project labeling config references the fields used in the sample, such as `$image` or `$text`.

## Sample fields

- `data.image`: public image URL for image labeling tasks
- `data.text`: sample text for text labeling tasks
- `meta.task_id`: mock task identifier
- `meta.category`: mock category value

If your Label Studio project only needs text or only needs images, you can remove the other field from the imported tasks.
