import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import "video-react/dist/video-react.css";
import { Player } from "video-react";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);

  // Function to handle file selection
  const onDrop = (acceptedFiles) => {
    console.log("Files dropped:", acceptedFiles);
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
      setValue(name, file, { shouldValidate: true });
    }
  };

  // Configure Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video
      ? { "video/mp4": [".mp4"], "video/webm": [".webm"], "video/ogg": [".ogg"] }
      : { "image/jpeg": [".jpeg"], "image/png": [".png"], "image/jpg": [".jpg"] },
    onDrop,
    noClick: true, // Ensures clicking the box doesn’t interfere with manual selection
  });

  // Convert file to Base64 preview
  const previewFile = (file) => {
    console.log("Previewing file:", file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // Register form input
  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  // Update form field value when file is selected
  useEffect(() => {
    if (selectedFile) {
      setValue(name, selectedFile, { shouldValidate: true });
    }
  }, [selectedFile, setValue, name]);

  return (
    <div className="flex flex-col space-y-2">
      {/* Label */}
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      {/* Upload Box */}
      <div
        {...getRootProps()}
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
        onClick={() => inputRef.current?.click()} // Manually trigger input click
      >
        {/* Hidden Input */}
        <input
          {...getInputProps()}
          ref={inputRef}
          accept={video ? "video/mp4,video/webm,video/ogg" : "image/jpeg,image/png,image/jpg"}
        />

        {/* Preview */}
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img src={previewSource} alt="Preview" className="h-full w-full rounded-md object-cover" />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {/* Cancel Button */}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          // Drag & Drop Zone
          <div className="flex w-full flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop a {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {/* Error Message */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
