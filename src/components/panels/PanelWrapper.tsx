// components/ui/PanelWrapper.tsx

export default function $1({ theme }: { theme: 'blue' | 'purple' })PanelWrapper({ children }: { children: React.ReactNode }) {
    return (
      <div className="w-full h-full p-2 
                      text-[clamp(9px,0.9vw,13px)] 
                      break-words 
                      overflow-hidden 
                      leading-snug 
                      min-w-0 
                      whitespace-pre-wrap">
        {children}
      </div>
    )
  }