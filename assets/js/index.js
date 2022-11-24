const propiedadesJSON = [
  {
    name: 'Casa de campo',
    description: 'Un lugar ideal para descansar de la ciudad',
    src: 'https://www.construyehogar.com/wp-content/uploads/2020/02/Dise%C3%B1o-casa-en-ladera.jpg',
    rooms: 2,
    m: 170,
  },
  {
    name: 'Casa de playa',
    description: 'Despierta tus días oyendo el oceano',
    src: 'https://media.chvnoticias.cl/2018/12/casas-en-la-playa-en-yucatan-2712.jpg',
    rooms: 2,
    m: 130,
  },
  {
    name: 'Casa en el centro',
    description: 'Ten cerca de ti todo lo que necesitas',
    src: 'https://fotos.perfil.com/2018/09/21/trim/950/534/nueva-york-09212018-366965.jpg',
    rooms: 1,
    m: 80,
  },
  {
    name: 'Casa rodante',
    description: 'Conviertete en un nómada del mundo sin salir de tu casa',
    src: 'https://cdn.bioguia.com/embed/3d0fb0142790e6b90664042cbafcb1581427139/furgoneta.jpg',
    rooms: 1,
    m: 6,
  },
  {
    name: 'Departamento',
    description: 'Desde las alturas todo se ve mejor',
    src: 'https://www.adondevivir.com/noticias/wp-content/uploads/2016/08/depto-1024x546.jpg',
    rooms: 3,
    m: 200,
  },
  {
    name: 'Mansión',
    description: 'Vive una vida lujosa en la mansión de tus sueños ',
    src: 'https://resizer.glanacion.com/resizer/fhK-tSVag_8UGJjPMgWrspslPoU=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CUXVMXQE4JD5XIXX4X3PDZAVMY.jpg',
    rooms: 5,
    m: 500,
  },
]

const inputRooms = document.querySelector('#inputRooms')
const inputFrom = document.querySelector('#inputFrom')
const inputTo = document.querySelector('#inputTo')
const buttonSearch = document.querySelector('#buttonSearch')
const properties = document.querySelector('#propiedades')
const totalProperties = document.querySelector('#totalProperties')

const filterByRoom = json => {
  const rangeRooms = json.map(mov => mov.rooms)
  const min = rangeRooms.reduce((a, b) => Math.min(a, b))
  const max = rangeRooms.reduce((a, b) => Math.max(a, b))

  const filterMinMax = json.map(mov => {
    const roomsInputCondition =
      +inputRooms.value >= min && +inputRooms.value <= max
        ? +inputRooms.value
        : false

    if (roomsInputCondition === mov.rooms) {
      return mov
    }
  })

  return filterMinMax
}

const filterByMeter = json => {
  const rangeMeter = json.map(mov => mov.m)
  const min = rangeMeter.reduce((a, b) => Math.min(a, b))
  const max = rangeMeter.reduce((a, b) => Math.max(a, b))

  const filterInputNumbers = json.map(mov => {
    const minNumberCondition =
      +inputFrom.value >= min && +inputFrom.value <= max
        ? +inputFrom.value
        : false

    const maxNumberCondition =
      +inputTo.value >= min && +inputTo.value <= max ? +inputTo.value : false

    if (maxNumberCondition >= mov.m && minNumberCondition <= mov.m) {
      return mov
    }
  })

  return filterInputNumbers
}

const filterUndefined = (rooms, meters) => {
  const filterUndefinedRooms = rooms.filter(mov =>
    mov !== undefined ? mov : false
  )

  const filterUndefinedMeters = meters.filter(mov =>
    mov !== undefined ? mov : false
  )

  const propertiesArr = [...filterUndefinedRooms, ...filterUndefinedMeters]

  const deleteRepeated = propertiesArr.filter(
    (mov, index) => propertiesArr.indexOf(mov) === index
  )

  return deleteRepeated
}

buttonSearch.addEventListener('click', () => {
  propiedades.innerHTML = ''

  const finalObjectProperties = filterUndefined(
    filterByRoom(propiedadesJSON),
    filterByMeter(propiedadesJSON)
  )

  if (+inputRooms.value <= 0) {
    return (totalProperties.textContent =
      'Debes ingresar una cantidad de cuartos')
  }

  if (+inputFrom.value <= 0 || +inputTo.value <= 0) {
    return (totalProperties.textContent =
      'Debes ingresar un rango de metros cuadrados.')
  }

  for (const i of finalObjectProperties) {
    const roomsValidation = +inputRooms.value === i.rooms
    const metersValidation =
      +inputFrom.value <= i.m && +inputTo.value >= i.m ? true : false

    totalProperties.textContent = `Total: ${[i].length}`

    if (roomsValidation === true && metersValidation === true) {
      properties.innerHTML += `
         <div class="propiedad">
           <div
             class="img"
             style="
               background-image: url('${i.src}');
             "
           ></div>
           <section>
             <h5>${i.name}</h5>
             <div class="d-flex justify-content-between">
               <p>Cuartos: ${i.rooms}</p>
               <p>Metros: ${i.m}</p>
             </div>
             <p class="my-3">Mansión gigante</p>
             <button class="btn btn-info">Ver más</button>
           </section>
         </div>
`
    }
  }
})
