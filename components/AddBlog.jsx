import { useState } from "react";

const AddBlog = ({ onBack }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    date: "",
    category: "",
    imageUrl: "",
    excerpt: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("FORM DATA:", formData);


  try {
    const res = await fetch("https://studycupsbackend-wb8p.onrender.com/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed");

    alert("✅ Blog published successfully");

    if (onBack) onBack();

  } catch (err) {
    console.error(err);
    alert("❌ Failed to publish blog");
  }
};


  return (
    <div className="max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Add New Blog
        </h1>

        {onBack && (
          <button
            onClick={onBack}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Blogs
          </button>
        )}
      </div>

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 space-y-6"
      >
        {/* ROW 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author Name
            </label>
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g. StudyCups Editorial Team"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Publish Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Engineering / Exams / Guidance"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Featured Image URL
            </label>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* EXCERPT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Excerpt
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            placeholder="Short summary shown on blog listing..."
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blog Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={10}
            placeholder="Write full blog content here..."
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
