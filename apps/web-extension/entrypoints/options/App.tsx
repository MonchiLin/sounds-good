import { Button } from "@repo/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/card"

function App() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">共享 UI 组件示例 - 浏览器扩展</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">按钮组件</h2>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap">
            <Button variant="default">默认按钮</Button>
            <Button variant="destructive">危险按钮</Button>
            <Button variant="outline">轮廓按钮</Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="secondary">次要按钮</Button>
            <Button variant="ghost">幽灵按钮</Button>
            <Button variant="link">链接按钮</Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">卡片组件</h2>
        <Card>
          <CardHeader>
            <CardTitle>卡片标题</CardTitle>
            <CardDescription>这是一个卡片描述，展示了共享 UI 组件的使用方式</CardDescription>
          </CardHeader>
          <CardContent>
            <p>这是卡片的内容区域。您可以在这里放置任何内容。</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">取消</Button>
            <Button>确认</Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}

export default App
