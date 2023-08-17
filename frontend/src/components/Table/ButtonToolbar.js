import Button from "react-bootstrap/Button";
import { MdRestore } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
} from "../../slices/usersApiSlice";

const ButtonToolbar = ({
  checkedUsers,
  refetch,
  setCheckedUsers,
  setSelectAll,
  isLoading,
}) => {
  const [deleteUser] = useDeleteUserMutation();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const blockHandler = async () => {
    try {
      await blockUser(checkedUsers);
      setCheckedUsers([]);
      setSelectAll(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const unblockedHandler = async () => {
    try {
      await unblockUser(checkedUsers);
      setCheckedUsers([]);
      setSelectAll(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteHandler = async () => {
    try {
      await deleteUser(checkedUsers);
      setCheckedUsers([]);
      setSelectAll(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="toolbar">
        <Button variant="outline-danger" size="sm" onClick={blockHandler}>
          Block
        </Button>
        <MdRestore size="25px" onClick={unblockedHandler} />

        <MdDeleteForever size="25px" onClick={deleteHandler} />
      </div>
    </>
  );
};

export default ButtonToolbar;
