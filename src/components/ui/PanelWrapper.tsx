export default function $1({ theme }: { theme: 'blue' | 'purple' })PanelWrapper({ children }: { children: React.ReactNode }) {
    return (
      <div className="w-full h-full p-4
                      text-[clamp(10px,0.95vw,13px)]
                      break-words
                      min-w-0
                      overflow-hidden
                      leading-tight">
        {children}
      </div>
    )
  }