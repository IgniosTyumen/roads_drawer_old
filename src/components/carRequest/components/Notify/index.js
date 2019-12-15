import React, {Component, Fragment} from 'react';
import Button from '~/components/carRequest/components/ui/Button';
import Icon from '~/components/carRequest/components/ui/Icon';
import IconCounter from '~/components/carRequest/components/ui/IconCounter';
import Dropdown from '~/components/carRequest/components/ui/Dropdown';

export class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carrequests: [],
      carRequestAmount: 0,
      isOpenDropdown: false,
    };
  }

  fetchCarRequestsToolbar = () => {
    // axios.get('/api/menu/car_request_toolbar')
    //   .then((response) => {
    //     if (response.data.objects) {
    //       const [carrequestToolbar] = response.data.objects;
    //
    //
    //       const carrequestsList = JSON.parse(carrequestToolbar.carrequests);
    //       this.setState({
    //         carrequests: carrequestsList,
    //         carRequestAmount: carrequestsList.length,
    //       });
    //     }
    //   });
  }

  componentDidMount() {
    this.fetchCarRequestsToolbar();
    this.interval = setInterval(this.fetchCarRequestsToolbar, 30 * 1000); // Call this each 30 seconds
  }

  handleToggleDropdown = () => {
    this.setState({ isOpenDropdown: !this.state.isOpenDropdown });
  }

  render() {
    const { handleToggleDropdown } = this;
    const {
      carRequestAmount,
      carrequests,
      isOpenDropdown,
    } = this.state;

    return (
      <Fragment>
        <Button
          variant={carRequestAmount ? 'pulse' : 'hidden'}
          onClick={handleToggleDropdown}
        >
          <Icon name='bell' />
          <IconCounter value={carRequestAmount}/>
        </Button>
        <Dropdown
          list={carrequests}
          isOpenDropdown={isOpenDropdown}
          handleToggleDropdown={handleToggleDropdown}
        />
      </Fragment>
    );
  }
}

export default Notify;
