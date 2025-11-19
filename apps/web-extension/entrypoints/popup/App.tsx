import { useState } from "react"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-80 p-4">
      <div className="mb-4 text-center">
        <h1 className="text-lg font-semibold text-blue-600">音标学习扩展</h1>
        <p className="text-sm text-gray-600">Browser Extension Demo</p>
      </div>

      <div className="space-y-3">
        <div className="text-center">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            计数: {count}
          </button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          基于 WXT + React 构建
        </div>

        <div className="text-xs text-gray-400 text-center">
          <p>编辑 popup/App.tsx 测试热更新</p>
        </div>
      </div>
    </div>
  )
}

export default App
