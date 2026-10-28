import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { hashVisitorId } from '../../lib/experiment';
import { CtaForm } from './CtaForm';

type Props = {
  searchParams: Promise<{ preview?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { preview } = await searchParams;
  const cookieStore = await cookies();

  const visitorId = cookieStore.get('visitor_id')?.value;
  const storedVariant = cookieStore.get('variant')?.value as 'a' | 'b' | undefined;

  let activeVariant: 'a' | 'b' = 'a';
  if (preview === 'a' || preview === 'b') {
    activeVariant = preview;
  } else if (storedVariant) {
    activeVariant = storedVariant;
  } else if (visitorId) {
    activeVariant = hashVisitorId(visitorId);
  }

  const isPreview = preview === 'a' || preview === 'b';

  const metadataCopy = {
    a: {
      title: 'Cursos de oficio en ocho semanas, con salida laboral',
      description: 'Aprendé carpintería, electricidad o cocina en ocho semanas. Grupos de doce personas y práctica real, con una salida laboral que se puede cobrar.',
    },
    b: {
      title: 'Abril abre cupos: cursos de oficio en grupos de 12',
      description: 'El 14 de abril empiezan grupos de doce. En la cohorte anterior, ocho de cada diez consiguieron trabajo en el rubro antes de los noventa días.',
    },
  };

  return {
    title: metadataCopy[activeVariant].title,
    description: metadataCopy[activeVariant].description,
    alternates: {
      canonical: 'https://taller-norte.edu.ar/practica',
    },
    robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function PracticaPage({ searchParams }: Props) {
  const { preview } = await searchParams;
  const cookieStore = await cookies();

  const visitorId = cookieStore.get('visitor_id')?.value;
  const storedVariant = cookieStore.get('variant')?.value as 'a' | 'b' | undefined;

  let activeVariant: 'a' | 'b' = 'a';
  if (preview === 'a' || preview === 'b') {
    activeVariant = preview;
  } else if (storedVariant) {
    activeVariant = storedVariant;
  } else if (visitorId) {
    activeVariant = hashVisitorId(visitorId);
  }

  const copy = {
    a: {
      titular: 'Ocho semanas para un oficio que se puede cobrar.',
      cta: 'Ver cupos de abril',
    },
    b: {
      titular: 'El curso empieza el 14 de abril. El cupo, no.',
      cta: 'Reservar mi lugar',
    },
  };

  return (
    <main style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>{copy[activeVariant].titular}</h1>
      
      <section style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', margin: '20px 0' }}>
        <h3>Información de la Oferta</h3>
        <ul>
          <li><strong>Inicio:</strong> 14 de abril</li>
          <li><strong>Duración:</strong> 8 semanas</li>
          <li><strong>Cupo:</strong> 12 personas</li>
          <li><strong>Oficios:</strong> carpintería, electricidad y cocina</li>
        </ul>
      </section>

      <CtaForm ctaText={copy[activeVariant].cta} />
    </main>
  );
}