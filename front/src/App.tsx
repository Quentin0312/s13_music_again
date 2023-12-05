import { createSignal, type Component, createEffect } from "solid-js";

const App: Component = () => {
  const [files, setFiles] = createSignal<File>();

  createEffect(async () => {
    if (files() != undefined) {
      console.log("files =>", files());
      saveFile(files() as File);
    }
  });
  return (
    <>
      <div>LETS GOO</div>
      <input
        type="file"
        id="input"
        onChange={(e) => setFiles((e.target.files as FileList)[0])}
      />
    </>
  );
};

export default App;

async function saveFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const promise = await fetch("http://127.0.0.1:8000/save_file", {
    method: "POST",
    body: formData,
  });
  const response = await promise.json();
  console.log(response);
}
