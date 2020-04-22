// Takes the config and returns the config with the fully qualified paths based on the domain that is hosting it.
module.exports = function configJSON(req) {
  return {
    workflowApiVersion: '1.1',
    metaData: {
      // the location of our icon file
      icon: `images/icon.svg`,
      category: 'customer'
    },
    type: 'REST',
    lang: {
      // Internationalize your language here!
      'en-US': {
        name: 'Discount Redemption Split!',
        description: 'Check the status of the discount code.'
      }
    },
    arguments: {
      execute: {
        inArguments: [{
          discount: "{{Interaction.discount}}",
        }, {
          discountCode: "{{Interaction.discountCode}}"
        }],
        outArguments: [],
        // Fill in the host with the host that this is running on.
        // It must run under HTTPS
        url: `https://${req.headers.host}/modules/discount-redemption-split/execute`
      }
    },
    configurationArguments: {
      save: {
        url: `https://${req.headers.host}/modules/discount-redemption-split/save`
      },
      publish: {
        url: `https://${req.headers.host}/modules/discount-redemption-split/publish`
      },
      validate: {
        url: `https://${req.headers.host}/modules/discount-redemption-split/validate`
      },
      stop: {
        url: `https://${req.headers.host}/modules/discount-redemption-split/stop`
      }
    },
    userInterfaces: {
      configInspector: {
        size: 'scm-lg',
        emptyIframe: true,
      }
    },
    outcomes: [{
        arguments: {
          branchResult: 'no_activity'
        },
        metaData: {
          label: 'No Activity'
        }
      },
      {
        arguments: {
          branchResult: 'viewed_item'
        },
        metaData: {
          label: 'Viewed Item'
        }
      },
      {
        arguments: {
          branchResult: 'abandoned_cart'
        },
        metaData: {
          label: 'Abandoned Cart'
        }
      },
      {
        arguments: {
          branchResult: 'purchased_item'
        },
        metaData: {
          label: 'Purchased Item'
        }
      }
    ],
    schema: {
      arguments: {
        execute: {
          inArguments: [{
            discountCode: {
              dataType: 'Text',
              direction: 'in',
              access: 'visible'
            },
            discountCode: {
              dataType: 'Text',
              direction: 'in',
              access: 'visible'
            }
          }],
          outArguments: []
        }
      }
    }
  };
};
