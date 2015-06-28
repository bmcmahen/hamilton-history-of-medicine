import React, {PropTypes, Component} from 'react'

if (__CLIENT__) {
  require('./index.css')
}

export default class Detail extends Component {

  static propTypes = {
    onRequestClose: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {

    let cover = {
      backgroundImage: 'url(https://static.pexels.com/photos/6547/sky-night-space-galaxy-large.jpeg)'
    }

    // todo: actually fetch the requested doc, and render it
    return (
      <article className='Detail'>
        <div className='Detail__cover-image' style={cover} />
        <div className='Detail__content'>
          <h2>British Eugenics Society</h2>
          <p>In 1907, the Eugenics Educational Society (after 1926 it became the Eugenics Society) was founded in Britain on the initiative of Francis Galton (1822-1911) and social reformer Sybil Gotto. Galton became the Society’s first president, and served until his death. He was replaced by Leonard Darwin (1850-1943), who remained president until 1928.</p>
          <p>The goal of the society was one of “furthering eugenic teaching and understanding in the home, in the school and elsewhere” (as cited in Chitty, 2007, p. 2). In other words, it focused on education and popularization of eugenics. It was a small organization and its membership was made up of middle-class professionals (physicians, scientists, writers, politicians, etc.) including individuals such as writer H.G Wells (1886-1946), politician Winston Churchill (1874-1965), and birth-control advocate Mary Stopes (1880-1958), among others. Even though the Society was small, it enjoyed a degree of influence due to its prominent members.</p>
          <p>In 1909, the Society established The Eugenics Review (1909-1968), a quarterly journal that was an organ for eugenic propaganda (Kevles, 1985). The Society was also involved in monitoring all parliamentary bills in relation to eugenics. For instance, in 1913, the Society was involved in drafting the Mental Deficiency Act, which would have allowed for segregation of those labelled as “feebleminded”.</p>
          <p>Since the membership of the Society was made up of individuals from various professions, there is no denying that their views on eugenics diverged at times. There were often tensions between the “classic” and “reform” eugenicists. The classic eugenicists believed that “heredity was predominant and therefore that health and welfare measures based on environmental interventions against mortality and morbidity would merely encourage the proliferation of the ‘unfit’” (Bland and Hall, 2010). Those that can be classified as reform eugenicist were interesting in pushing the Society away from becoming a propaganda organization to one that focused on scientific research. They held that environmental factors as much as heredity could contribute to physical or mental deterioration. Thus, they were more open to improving the environment though social programs and public health measures (Kevles, 1985).</p>
          <p>Following the Second World War, eugenic ideologies and policies were discredited by many because of their association with Nazi Germany. Yet, the British Eugenics Society was slow to catch up, and only changed its name to the Galton Institute in 1989 (Bland and Hall, 2010).</p>
          <ul className='Detail__reference'>
            <h3>Resources</h3>
            <li>
              <p>Ball, N. & Wolbring, G. (2013). Portrayals of and Arguments around different Eugenic Practices: Past and Present. International Journal of Disability, Community & Rehabilitation, 12 (2), Article 2.</p>
            </li>
            <li>
              <p>Barham, J. C. (1989). Education the Deaf Culture. Journal of the British Association of Teachers of the Deaf, 13(4), 110-113.</p>
            </li>
          </ul>
        </div>
      </article>
    )
  }
}
