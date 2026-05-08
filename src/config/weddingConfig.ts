export interface WeddingCouple {
  fullName: string
}

export interface WeddingParents {
  father: string
  mother: string
}

export interface WeddingVenue {
  name: string
  address: string
  city: string
  lat: number
  lng: number
}

export interface WeddingConfig {
  groom: WeddingCouple
  bride: WeddingCouple
  groomParents: WeddingParents
  brideParents: WeddingParents
  weddingDate: string // ISO 8601
  weddingTime: string // Display format: "4:00 PM"
  receptionTime: string // Display format: "3:00 pm"
  venue: WeddingVenue
  logoUrl: string
  dressCodeImgUrl: string
  genderRevealImgUrl: string
  musicUrl: string
  photos: string[]
  invitationText: string
  giftNote: string
  hashtag?: string
}

const weddingConfig: WeddingConfig = {
  groom: {
    fullName: 'Ariel',
  },
  bride: {
    fullName: 'Mishell',
  },
  groomParents: {
    father: 'Ariel Vitalino Monterroso Morales',
    mother: 'Luz Marina Alvarado Andrade',
  },
  brideParents: {
    father: 'Lorenzo Seth Chávez Vásquez',
    mother: 'Brenda Hedelmira Zamora Lopéz',
  },
  weddingDate: '2026-06-20T16:00:00',
  weddingTime: '4:00 PM',
  receptionTime: '3:00 pm',
  venue: {
    name: 'Cerro de Oro',
    address: 'Santiago La Laguna',
    city: 'Sololá, Guatemala',
    lat: 14.663308,
    lng: -91.1658654,
  },
  logoUrl:
    'https://res.cloudinary.com/wovenwar/image/upload/v1778013333/Escudo_Mishell_y_Ariel_q09blw.png',
  dressCodeImgUrl:
    'https://res.cloudinary.com/wovenwar/image/upload/v1778044806/2_y0bxrv.png',
  genderRevealImgUrl:
    'https://res.cloudinary.com/wovenwar/image/upload/v1778046008/Revelaci%C3%B3nde_G%C3%A9nero_Mish_y_Ariel_urbsxi.png',
  musicUrl: 'https://res.cloudinary.com/wovenwar/video/upload/v1775765362/musica_ayx0vw.mp3',
  photos: [
    'https://res.cloudinary.com/wovenwar/image/upload/v1777223954/IMG_6009.JPG_zxgjpb.jpg',
    'https://res.cloudinary.com/wovenwar/image/upload/v1777223979/IMG_7170.JPG_iohedt.jpg',
    'https://res.cloudinary.com/wovenwar/image/upload/v1777223954/IMG_6359.JPG_zpnh3v.jpg',
    'https://res.cloudinary.com/wovenwar/image/upload/v1777223986/IMG_7173.JPG_d9e3pa.jpg',
    'https://res.cloudinary.com/wovenwar/image/upload/v1777223951/IMG_7180.JPG_vtmngl.jpg',
    'https://res.cloudinary.com/wovenwar/image/upload/v1777224506/IMG_7563.JPG_sy3xlm.jpg',
  ],
  invitationText:
    'Con mucha alegría les hacemos participes de la celebración de nuestra boda civil',
  giftNote:
    'Su presencia es el mejor regalo. Si deseas ayudarnos en esta nueva etapa, preferimos una contribución económica.',
  hashtag: '#MishellYAriel2026',
}

export default weddingConfig
