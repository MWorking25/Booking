interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'fa fa-dashboard',
   /*  badge: {
      variant: 'info',
      text: 'NEW'
    } */
  },
  {
    title: true,
    name: 'Masters'
  },
  {
    name: 'Areas',
    url: '/masters/area',
    icon: 'fa fa-location-arrow'
  },
  {
    name: 'Hotel Aminities',
    url: '/masters/hotel-aminities',
    icon: 'fa fa-bed'
  },
  {
    name: 'Members',
    url: '/masters/members',
    icon: 'fa fa-users'
  },{
    name: 'Users',
    url: '/masters/users',
    icon: 'fa fa-user'
  },{
    name: 'Trains',
    url: '/masters/trains',
    icon: 'fa fa-train'
  },
  {
    name: 'Offers',
    url: '/masters/offers',
    icon: 'fa fa-tags'
  },
  {
    title: true,
    name: 'Hotels'
  },
  {
    name: 'Hotel`s Details',
    url: '/hotels/hotels',
    icon: 'fa fa-list'
  },
  {
    name: 'Hotel Bookings',
    url: '/hotels/booking',
    icon: 'fa fa-key'
  },
 /*  {
    name: 'Hotel Details',
    url: '/hotels/details',
    icon: 'fa fa-key'
  }, */
  {
    title: true,
    name: 'Experiences'
  },
  {
    name: 'Experience`s Details',
    url: '/experiences/list',
    icon: 'fa fa-list'
  },
  {
    name: 'Experience Bookings',
    url: '/experiences/booking',
    icon: 'fa fa-ticket'
  },
  {
    title: true,
    name: 'Buses'
  },
  {
    name: 'Buse`s Details',
    url: '/buses/list',
    icon: 'fa fa-list'
  },
  {
    name: 'Buses Bookings',
    url: '/buses/booking',
    icon: 'fa fa-ticket'
  },
  {
    title: true,
    name: 'Cabs'
  },
  {
    name: 'Cab`s Details',
    url: '/cabs/list',
    icon: 'fa fa-list'
  },
  {
    name: 'Cab`s Bookings',
    url: '/cabs/booking',
    icon: 'fa fa-ticket'
  },
  {
    title: true,
    name: 'Vehical on rent'
  },
  {
    name: 'vehicals`s Details',
    url: '/vehicalsonrent/vehicalonrent',
    icon: 'fa fa-list'
  },
  {
    name: 'Vehicals`s Bookings',
    url: '/vehicalsonrent/booking',
    icon: 'fa fa-ticket'
  },
  {
    title: true,
    name: 'Restraurants'
	
  },
  {
    name: 'Restraurant`s Details',
    url: '/restraurants/list',
    icon: 'fa fa-list'
  },
  {
    name: 'Restraurant Orders',
    url: '/restraurants/orders',
    icon: 'fa fa-shopping-bag'
  },
  {
    title: true,
    name: 'Reports'
  },
  {
    name: 'Hotels',
    url: '/reports/hotels',
    icon: 'fa fa-building'
  },
  {
    name: 'Experiences',
    url: '/reports/experiences',
    icon: 'fa fa-ship'
  },
  {
    name: 'Buses',
    url: '/reports/buses',
    icon: 'fa fa-bus'
  },
  {
    name: 'Cabs',
    url: '/reports/cabs',
    icon: 'fa fa-cab'
  },
  {
    name: 'Restraurants',
    url: '/reports/restraurants',
    icon: 'fa fa-cutlery'
  },
  
  /* {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Pagination',
        url: '/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Brand Buttons',
        url: '/buttons/brand-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Icons',
    url: '/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'CoreUI Icons',
        url: '/icons/coreui-icons',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Flags',
        url: '/icons/flags',
        icon: 'icon-star'
      },
      {
        name: 'Font Awesome',
        url: '/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  }, */
 /*  {
    divider: true
  }, */
 /*  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true },
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  } */
];
