import React from 'react';
import { toast } from 'react-toastify';
import hostLink from '../../Components/host';

const DeleteConfirm = ({ product, setProduct, refetch }) => {
  //remove doctor
  const handleDelete = () => {
    const { _id, name } = product;
    console.log(product);
    fetch(`${hostLink()}/product/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => res.json()).then(data => {
      console.log(data);
      if (data.deleteCount > 0) {
        toast.success(`Removed Product: ${name}`)
      }

    })
    setProduct(null)
    refetch();
  };
  return (
    <div>
      <input type="checkbox" id="delete-confirm" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle text-gray-100">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-400">Are you sure?</h3>
          <p className="py-4">Want to remove {product.name}!</p>
          <div className="modal-action">
            <label onClick={handleDelete()} className="btn">Confirm</label>
            <label className="btn">Cancel</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;