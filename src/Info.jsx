
export default function Info() {
  return (
    <div>
      <h1 style={{ fontWeight: 'bold', color: 'white' }}>Info</h1>

<h3 style={{ fontWeight: 'bold' }}>How To</h3>
      <p>To use this visualization, simply navigate through the 3D terrain to explore the population distribution across different wards in Johannesburg. You can click on the terrain to get more information about a specific ward or click on 'Show Map'
to toggle the visibility of the map overlay. The map provides a reference for understanding the geographical context of the population data. Below is an image of the map with the overlay directly ontop of it</p>
      <div style={{
        display: 'flex',

        justifyContent: 'center',

        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5em', margin: '2em 0' }}></div>
      <img
        src="/images/key_joburg.png"
        alt="Overlay"
        style={{
      
          top: '50%',
          left: '13%',
          width: '700px',
          height: 'auto',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        }}
      />
      </div>
<p>
  For those unfamiliar with Johannesburg, the city is marked by stark contrasts shaped by its complex history. The largest and most well-known townships include Soweto, Alexandra, Diepsloot, Orange Farm, and Lenasia—each with rich cultural significance and unique identities. Other major township areas such as Tembisa and Katlehong also play important roles in the city’s social fabric. These areas were historically formed under apartheid spatial planning and remain central to Johannesburg’s urban life today.  
  <br></br>
  In contrast, the more affluent suburbs include Rosebank, Sandton, Parktown North, and Parkview, as well as areas like Houghton, Hyde Park, Bryanston, and Melrose Arch—known for their upscale homes, business districts, and leafy streets. These neighbourhoods highlight the city’s economic power and its ongoing evolution. 
</p>

      <h3 style={{ fontWeight: 'bold' }}>Background</h3>

      <p>I decided to create a heightmap-based population data visualization of Johannesburg, the city where I grew up. For those unfamiliar with Johannesburg, it is the largest city in South Africa and the country’s economic hub. South Africa is widely recognized as one of the most unequal societies in the world — a legacy of apartheid, which officially ended only 30 years ago. This context is well explained in a paper by Chirisa and Matamanda (2019), where they reference Harrison (2006), who described that:
</p>

<p style={{     fontStyle: 'italic', paddingLeft: '20em', paddingRight: '20em'   }}>
‘The spatial morphology of the extended metropolitan region (Johannesburg) has polarised
around two compartmentalised extremes: on the one hand, the spaces of affluence are healthy,
functional and largely the exclusive preserve of the white upper- and middle-classes; on the
other, the overcrowded spaces of con nement are distressed, dysfunctional and where the
overwhelming majority of black urban residents live and work . . .’(as cited in Chirisa & Matamanda, 2019, p. 360). The two photos below illustrate this inequality: the first photo is of Rosebank, a wealthy suburb in Johannesburg, while the second photo shows a township called Soweto, which is a historically black residential area that often lacks basic services and infrastructure.
</p>
<div style={{
        display: 'flex',
        gap: '2em',
        justifyContent: 'center',
        margin: '2em 0',
        flexWrap: 'wrap'
      }}>
        <img
          src="/images/rosebank.png"
          alt="Rosebank, a wealthy suburb in Johannesburg"
          style={{
            width: '400px',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          }}
        />
        <img
          src="/images/soweto.png"
          alt="Soweto, a historically black residential area in Johannesburg"
          style={{
            width: '400px',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          }}
        />
      </div>


<p>
This data visualisation aims to spread light on these inequalities by combining two pieces of data: a map of Johannesburg’s wards and world-wide population data. I downloaded the map of Johannesburg’s wards directily form the independent organisation that makes it for South Africa  after the local government elections which is called the Municipal Demarcation Board and you can see the shape file for 2020 <a href="https://dataportal-mdb-sa.opendata.arcgis.com/datasets/279fbf82a48f46678ddd498627af3f0a_0/about" target="_blank"   style={{ color: 'white', textDecoration: 'none' }} rel="noopener noreferrer">here.</a></p>

<p>
I then got my population data from World Pop which you can find <a href="https://data.humdata.org/dataset/worldpop-population-counts-for-world" target="_blank"   style={{ color: 'white', textDecoration: 'none' }} rel="noopener noreferrer">here</a>. WorldPop is a collaborative project led by the University of Southampton (UK) in partnership with other institutions like the University of Louisville (USA) and Université de Namur (Belgium). It produces high-resolution gridded population datasets that estimate the spatial distribution of people around the world. The project is funded by entities such as the Bill and Melinda Gates Foundation. The data I used covers the years 2000 to 2020 and provides detailed estimates of population counts mapped onto a grid — with resolutions ranging from about 100 meters to 1 kilometer per grid cell. </p>

<p>
It is important to mention that for rapidly changing urban areas like Johannesburg, the data reflects estimates rather than real-time counts. However, I still think that the population data I got from this data set still reflects the general population distribution of Johannesburg. 
</p>

<p>
If anyone has any questions about my method or suggestions of how I could improve it and if there are other data sets out there please let me know! My emails address is : <a href="mailto:imoleadrews@gmail.com" style={{ color: 'white', textDecoration: 'none' }}>imoleadrews@gmail.com</a>
</p>
<p>
References:

Chirisa, I., & Matamanda, A. (2019). Forces shaping urban morphology in Southern Africa Today: Unequal interplay among people, practice and policy. *Journal of Urbanism: International Research on Placemaking and Urban Sustainability*, *12*(3), 354–372. https://doi.org/10.1080/17549175.2019.1626262
</p>
    </div>
  );
}
