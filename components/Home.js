import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList';
import { Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingLeft: 40,
    paddingRight: 40,
  },
  gridList: {

    overflowY: 'auto',
  },
};

const tilesData = [
  {
    img: 'https://s3-us-west-2.amazonaws.com/extra-crispy-media/assets/field%2Fimage%2Fstarbucks-psl-hero-builder.jpg',
    title: 'Latte',
    featured: true,
  },
  {
    img: 'http://www.starbucks.com.sg/images/default-source/menu/drinks/espresso-beverages/cappuccino_830x550.jpg',
    title: 'Cappuccino',

  },
  {
    img: 'https://assets3.thrillist.com/v1/image/1768238/size/tmg-article_default_mobile.jpg',
    title: 'Mocha',
  },
  {
    img: 'http://www.starbuckcoffee.net/wp-content/uploads/2011/08/CaramelMacchiato_m_4.jpg',
    title: 'Macchiato',
    featured: true,
  },
  {
    img: 'http://prod-cdn.thekrazycouponlady.com/wp-content/uploads/2013/03/starbucks-beverage-coupon.jpg',
    title: 'Espresso',
  },
  {
    img: 'https://thethrivelifeblog.files.wordpress.com/2014/08/starbucks-coffee-e1335800771163.jpg',
    title: 'Americano',
  },

];

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);

  }

  handleItemClick(title, img) {
    alert(title)
  }

  render() {
    return (
        <div style={styles.root}>
          <GridList
              cols={2}
              cellHeight={250}
              padding={15}
              style={styles.gridList}
          >
            {tilesData.map((tile) => (
                <GridTile
                    key={tile.img}
                    title={tile.title}
                    titlePosition="top"
                    titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                    cols={tile.featured ? 2 : 1}
                    rows={tile.featured ? 2 : 1}
                    onTouchTap={() => {
                      this.handleItemClick(tile.title, tile.img)
                    }}
                >
                  <img src={tile.img} style="width: 100%"/>
                </GridTile>
            ))}
          </GridList>
        </div>
    )
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
}

