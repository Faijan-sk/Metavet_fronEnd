import React, { Fragment } from "react";
import { useTheme } from "../../context/ThemeProvider";

const Horizontal = () => {
  const { darkTheme, lightTheme } = useTheme();

  const handleTheme = (e) => {
    if (e.target.checked) {
      lightTheme();
    } else {
      darkTheme();
    }
  };

  return (
    <Fragment>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-primary">Management</a>
        </div>
        {/* Button to Open Modal */}
        <label htmlFor="my_modal_6" className="btn">
          Open Modal
        </label>

        <div className="flex-none gap-2">
          {/* Theme Toggle */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                defaultChecked
                onChange={handleTheme}
              />
              <span className="label-text ms-1">Dark</span>
            </label>
          </div>

          {/* User Dropdown */}
          <div>
            <span className="text-base">Waseem Akram</span>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
          <div className="modal-action">
            {/* Button to Close Modal */}
            <label htmlFor="my_modal_6" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Horizontal;
