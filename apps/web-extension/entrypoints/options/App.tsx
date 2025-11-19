function App() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">音标学习扩展</h1>
        <p className="text-gray-600">浏览器扩展选项页面</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">关于扩展</h2>
          <p className="text-gray-600 mb-4">
            这是一个基于 WXT 和 React 构建的浏览器扩展演示项目。
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              主要操作
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
              次要操作
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">功能说明</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• 基于 WXT 框架构建</li>
            <li>• 使用 React 19 和 TypeScript</li>
            <li>• 集成 Tailwind CSS 样式</li>
            <li>• 支持热模块替换开发</li>
          </ul>
        </div>

        <div className="bg-blue-50 rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">技术栈</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-blue-700">
              <strong>前端框架:</strong> React 19
            </div>
            <div className="text-blue-700">
              <strong>语言:</strong> TypeScript
            </div>
            <div className="text-blue-700">
              <strong>构建工具:</strong> WXT + Vite
            </div>
            <div className="text-blue-700">
              <strong>样式:</strong> Tailwind CSS
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
