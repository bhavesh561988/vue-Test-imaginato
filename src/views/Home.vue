<template>
  <div class="home">
    <b-container>
      <b-row class="mb-4">
        <h4 class="float-left ml-3">
          <u> Order History </u>
        </h4>
      </b-row>
      <b-row class="mb-3">
        <b-input-group size="md" class="col-4">
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            placeholder="Type to Search"
          ></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
        <b-button variant="primary" @click="addOrder()"> Add Order </b-button>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            hover
            outlined
            :per-page="perPage"
            :items="orders"
            :current-page="currentPage"
            :fields="fields"
            :filter="filter"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
          >
            <template v-slot:cell(actions)="data">
              <b-button
                variant="success"
                @click="editOrder(data.item.orderId)"
                class="mr-2"
              >
                Edit
              </b-button>
              <b-button
                variant="danger"
                @click="deleteOrder(data.item.orderId)"
                class="mr-2"
              >
                Delete
              </b-button>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </b-col>
      </b-row>
      <form ref="addform">
        <b-modal v-model="orderModel" title="New Order" no-close-on-backdrop>
          <b-form-group
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-input
              id="name-input"
              name="name-input"
              v-model="name"
              v-validate="'required'"
              :class="{ 'is-invalid': errors.has('name-input') }"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Price"
            label-for="price-input"
            invalid-feedback="Price is required"
          >
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
              <input
                id="price-input"
                name="price-input"
                type="number"
                v-model="price"
                v-validate="'required'"
                :class="{ 'is-invalid': errors.has('price-input') }"
                class="form-control"
                aria-label="Amount (to the nearest dollar)"
              />
            </div>
            <!-- <b-form-input
              id="price-input"
              name="price-input"
              type="number"
              v-model="price"
              v-validate="'required'"
              :class="{ 'is-invalid': errors.has('price-input') }"
            ></b-form-input> -->
          </b-form-group>
          <b-form-group
            label="Note"
            label-for="note-input"
            invalid-feedback="price is required"
          >
            <b-form-textarea
              id="note-input"
              v-model="note"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>

          <template #modal-footer>
            <b-button size="sm" variant="success" @click="handleSubmit">
              Add
            </b-button>
            <b-button size="sm" variant="danger" @click="orderModel = false">
              Cancel
            </b-button>
          </template>
        </b-modal>
      </form>
      <form ref="editform">
        <b-modal v-model="editModel" title="Edit Order" no-close-on-backdrop>
          <b-form-group
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-input
              id="name-input"
              name="name-input"
              v-model="name"
              v-validate="'required'"
              :class="{ 'is-invalid': errors.has('name-input') }"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Price"
            label-for="price-input"
            invalid-feedback="Price is required"
          >
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
              <input
                id="price-input"
                name="price-input"
                type="number"
                v-model="price"
                v-validate="'required'"
                :class="{ 'is-invalid': errors.has('price-input') }"
                class="form-control"
                aria-label="Amount (to the nearest dollar)"
              />
            </div>
            <!-- <b-form-input
              id="price-input"
              name="price-input"
              type="number"
              v-model="price"
              v-validate="'required'"
              :class="{ 'is-invalid': errors.has('price-input') }"
            ></b-form-input> -->
          </b-form-group>
          <b-form-group
            label="Note"
            label-for="note-input"
            invalid-feedback="price is required"
          >
            <b-form-textarea
              id="note-input"
              v-model="note"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>

          <template #modal-footer>
            <b-button size="sm" variant="success" @click="updateOrder">
              Update
            </b-button>
            <b-button size="sm" variant="danger" @click="editModel = false">
              Cancel
            </b-button>
          </template>
        </b-modal>
      </form>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    return {
      name: "",
      price: "",
      note: "",
      orderModel: false,
      editModel: false,
      perPage: 5,
      currentPage: 1,
      filter: "",
      sortBy: "orderId",
      sortDesc: true,
      fields: [
        {
          key: "orderId",
          sortable: true,
          thStyle: { backgroundColor: "aliceblue" },
        },
        {
          key: "name",
          sortable: true,
          thStyle: { backgroundColor: "aliceblue" },
        },
        {
          key: "price",
          label: "Price (usd)",
          sortable: true,
          thStyle: { backgroundColor: "aliceblue" },
        },
        { key: "note", thStyle: { backgroundColor: "aliceblue" } },
        {
          key: "actions",
          thStyle: { backgroundColor: "aliceblue", minWidth: "170px" },
        },
      ],
      orders: [
        {
          orderId: 1,
          name: "Masala lemonmade",
          price: 3,
          note: "Masala Lemonade with ginger.",
        },
        {
          orderId: 2,
          name: "Choco Volcano Cake",
          price: 10,
          note: "Choco Delight With A Gooey Chocolate Volcano Centre.",
        },
        {
          orderId: 3,
          name: "Jamuntini",
          price: 8,
          note: "Fresh Blast OfJamun With A Hint Of Refreshing Mint.",
        },
        {
          orderId: 4,
          name: "Pepsi Family Combo",
          price: 20,
          note: "Combo of 4 Pepsi Glasses.",
        },
        {
          orderId: 5,
          name: "Creamy Garlic Bread Stix",
          price: 35,
          note:
            "Freshly Baked, Buttery Garlic Bread Stix, Topped With A Gooey Cheese Sauce.",
        },
        {
          orderId: 6,
          name: "Cheesy Comfort Veg",
          price: 40,
          note:
            "Cheesy Creamy Pasta Comfort Topped With Onion, Green Capsicum, Red Capsicum & Sweet Corn.",
        },
        {
          orderId: 7,
          name: "Spicy Baked Chicken Wings",
          price: 22,
          note: "6 Pieces Of Spicy, Tender Chicken Wings.",
        },
        {
          orderId: 8,
          name: "Spiced Tomato Twist Non Veg",
          price: 50,
          note:
            "Tangy Flavourful Red Sauce Pasta Infused With Heavenly Herbs & Spices Topped With Chicken Sausage.",
        },
        {
          orderId: 9,
          name: "7up Duos Combo",
          price: 11,
          note: "Combo of 2 7up Glasses.",
        },
        {
          orderId: 10,
          name: "Country Feast Pizza",
          price: 45,
          note: "Herbed Onion & Green capsicum, Sweet Corn, Tomato, Mushroom.",
        },
      ],
    };
  },
  computed: {
    rows() {
      return this.orders.length;
    },
  },
  methods: {
    deleteOrder(id) {
      this.$swal({
        title: "Are you sure?",
        text: "Delete this order!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.orders.splice(id - 1, 1);
          this.$toast.success("Order deleted successfully!.", {
            duration: 3000,
          });
        }
      });
    },
    addOrder() {
      this.resetModal();
      this.orderModel = true;
    },
    resetModal() {
      this.name = "";
      this.price = "";
      this.note = "";
    },
    editOrder(id) {
      this.orderId = id;
      var i = id - 1;
      this.name = this.orders[i].name;
      this.price = this.orders[i].price;
      this.note = this.orders[i].note;
      this.editModel = true;
    },
    handleSubmit() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          let order_id = this.orders.length + 1;
          this.orders.push({
            orderId: order_id,
            name: this.name,
            price: this.price,
            note: this.note,
          });
          this.$toast.success("Order created successfully!.", {
            duration: 3000,
          });
          this.resetModal();
          // Hide the modal manually
          this.orderModel = false;
        }
      });
    },
    updateOrder() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          var i = this.orderId - 1;
          this.orders[i].name = this.name;
          this.orders[i].price = this.price;
          this.orders[i].note = this.note;
          this.$toast.success("Order updated successfully!.", {
            duration: 3000,
          });
          this.resetModal();
          this.editModel = false;
        }
      });
    },
  },
};
</script>
