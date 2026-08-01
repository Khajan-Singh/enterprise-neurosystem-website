import { EtherealShadow } from "@/components/ui/etheral-shadow";

export function AmbientShadow({ opacity = 0.1 }: { opacity?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <EtherealShadow
        color={`rgba(43, 58, 103, ${opacity})`}
        shape={{ scale: 60 }}
        noise={{ opacity: 0.3, scale: 1 }}
      />
    </div>
  );
}
