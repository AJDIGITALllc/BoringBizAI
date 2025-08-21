// Future 3D Character Component with ZZZ Animation
// To be implemented once you have your character.glb file

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float, Html } from '@react-three/drei';

interface CharacterModelProps {
  modelPath?: string;
}

function CharacterModel({ modelPath = "/character.glb" }: CharacterModelProps) {
  // Uncomment when you add your .glb file to client/public/
  // const { scene } = useGLTF(modelPath);
  // return <primitive object={scene} scale={1.2} />;
  
  // Placeholder for now
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#FFB74D" />
    </mesh>
  );
}

interface ZzzCharacter3DProps {
  /** Show the character */
  show?: boolean;
  /** Opportunity score to determine ZZZ intensity */
  opportunityScore?: number;
  /** Custom className */
  className?: string;
}

export function ZzzCharacter3D({ 
  show = true, 
  opportunityScore = 0,
  className 
}: ZzzCharacter3DProps) {
  if (!show) return null;

  const zzzCount = opportunityScore >= 90 ? 4 : opportunityScore >= 75 ? 3 : 2;

  return (
    <div className={`w-full h-96 ${className}`}>
      <Canvas>
        <ambientLight intensity={0.8} />
        <directionalLight position={[0, 5, 5]} />
        
        <Suspense fallback={
          <Html center>
            <div className="font-accent text-brand-primary">
              Loading character... 💤
            </div>
          </Html>
        }>
          {/* Floating Character */}
          <Float floatIntensity={0.6} speed={2}>
            <CharacterModel />
            
            {/* Floating Z's based on opportunity score */}
            <Float floatIntensity={1} speed={1.5} rotationIntensity={2}>
              {Array.from({ length: zzzCount }).map((_, index) => (
                <Html 
                  key={index}
                  position={[
                    0.3 + (index * 0.2), 
                    2.2 + (index * 0.3), 
                    (index % 2 === 0 ? 0.1 : -0.1)
                  ]}
                >
                  <span 
                    className="text-brand-primary zzz"
                    style={{ 
                      fontSize: \`\${2 - (index * 0.2)}rem\`,
                      animationDelay: \`\${index * 0.5}s\`
                    }}
                  >
                    💤
                  </span>
                </Html>
              ))}
            </Float>
          </Float>
        </Suspense>
        
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

interface BoringOpportunityScreen3DProps {
  /** Opportunity score */
  score: number;
  /** Show only for high scores */
  threshold?: number;
  /** Custom message */
  message?: string;
}

export function BoringOpportunityScreen3D({ 
  score, 
  threshold = 85,
  message 
}: BoringOpportunityScreen3DProps) {
  if (score < threshold) return null;

  return (
    <section className="p-6 space-y-6 brand-card">
      <div className="text-center">
        <h2 className="brand-heading text-xl mb-2">
          This biz is boring enough... 💤
        </h2>
        <p className="brand-body text-brand-secondary">
          {message || "Perfect for domination. Here's why:"}
        </p>
        <div className="brand-success-highlight inline-block mt-2">
          Opportunity Score: {score}/100
        </div>
      </div>
      
      <ZzzCharacter3D 
        opportunityScore={score}
        className="mx-auto"
      />
      
      <div className="text-center">
        <p className="font-accent text-brand-primary text-lg">
          🎯 Ready to transform boring into gold!
        </p>
      </div>
    </section>
  );
}

// Instructions for implementation:
/*
1. Add your character.glb file to client/public/character.glb
2. Install dependencies: npm install three @react-three/fiber @react-three/drei
3. Uncomment the useGLTF lines in CharacterModel component
4. Use the components in your audit results:

   {score >= 85 && (
     <BoringOpportunityScreen3D 
       score={calculateOpportunityScore(auditResult)}
       message="Custom celebration message"
     />
   )}
*/