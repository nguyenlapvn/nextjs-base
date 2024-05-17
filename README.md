# NextJs Base

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

Đầu tiên đổi tên file **.env.example -> .env.local**

hoặc chạy lệnh:

```bash
mv .env.example .env.local
```

sau đó

```bash
npm i

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

### Package use

- ui: [shadcn ](https://ui.shadcn.com/), có thể bổ sung thêm
- hook: [react-use](http://streamich.github.io/react-use), có thể bổ sung thêm
- state management: [jotai](https://jotai.org/)(dùng giống với react), [valtio](https://valtio.pmnd.rs/)(dùng giống javascript) có thể bổ sung thêm
- query - action: [axios](https://axios-http.com/vi/docs/intro), [TanStack Query](https://tanstack.com/query/latest), có thể bổ sung
- form: [react-hook-form](https://react-hook-form.com/), có thể bổ sung
- validation: [zod](https://zod.dev/), có thể bổ sung
- time: [date-fns](https://date-fns.org/), [dayjs](https://day.js.org/)
- multi language: [next-intl](https://next-intl-docs.vercel.app/)
- encode: sha3
- animation: [framer-motion](https://www.framer.com/motion/)
- js-utils: [lodash](https://lodash.com/)
- icon: [lucide-react](https://lucide.dev/icons/), [@radix-ui](https://www.radix-ui.com/icons)
- auth: [next-auth](https://next-auth.js.org/)
- table: [tanstack-table](https://tanstack.com/table/latest)
  ...

### Folder structure

- public: gồm file ảnh, phông chữ, file có sẵn
- src/component: gồm provider, ui, và những thành phần cơ bản nhất
- src/configs: gồm file cấu hình chung của app và các package, doc, danh sách
- src/hooks: gồm các custom hook
- src/lib: gồm thư mục và các file: hooks, action, atom, validations, các file
- src/locales: gồm file ngôn ngữ
- src/types: gồm các type chung
- src/styles: gồm các style
- src/app: bao gồm cả admin

### Quy tắc chung

- Đặt tên file: (không yêu cầu)

  Gợi ý: nên viết thường và nếu có 2 chữ thì nối với nhau bởi dấu "-"

```js
✅ Nên:
jotai-provider.tsx
❌ Hạn chế
jotaiProvider.tsx
```

`Những file dạng component jsx thì nên đặt với đuôi **.tsx**, còn file thuồn js thì đặt **.ts** có thể là **.js**`

- Khi export file: (không yêu cầu) **Ngoại trừ những file page thì bắt buộc của nextjs là `export default Page`**

  Gợi ý:

```js
✅ Nên:
export { JotaiProvider, HydrateAtoms, atomStore }
// or
export function JotaiProvider() {
  return ...
}
❌ Hạn chế
export default JotaiProvider
// or
export default  function JotaiProvider() {
  return ...
}
```

- Khi sử dụng toast ưu tiên sử dụng [**sonner**](https://sonner.emilkowal.ski/) sau đó mới đến **useToast**

```js
import { toast } from 'sonner'

// use
toast('Event has been created', {
  description: 'Sunday, December 03, 2023 at 9:00 AM',
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo'),
  },
})
```

- Khi sử dụng Icon ưu tiên sử dụng trong file Icons (có thể thêm icon nếu thiêú) hoặc có thể import trự tiếp từ [lucide-react](https://lucide.dev/icons/), [@radix-ui](https://www.radix-ui.com/icons)

```js
import { Icons } from '@/components/icons'
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
