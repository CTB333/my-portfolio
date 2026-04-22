import { useState } from "react";
import {
  useErrorSnack,
  useFetch,
  useScrollToTop,
  useTimeoutEffect,
} from "../hooks";
import { useScreenSize } from "../providers";
import { Input, Select, TextButton } from "../components";
import { CONSTANTS } from "../constants";

type RSVP = {
  name: string;
  phone: string;
  isComing: boolean;
  numBringing: number;
  guestList: string[];
  familySide: string;
  attendingDinner: boolean;
  keepInContact: boolean;
};

const FAMILY_SIDE_OPTIONS = [
  { value: "Mom", label: "Mom's Side" },
  { value: "Dad", label: "Dad's Side" },
  { value: "Lex", label: "Lex's Side" },
  { value: "Friends", label: "Friends" },
];

export const GraduationConsole = () => {
  useScrollToTop();
  const { ltSmall } = useScreenSize();

  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFamilySide, setSelectedFamilySide] = useState("");
  const [filterByTextLater, setFilterByTextLater] = useState<
    true | false | null
  >(null);
  const [filterByComing, setFilterByComing] = useState<true | false | null>(
    null,
  );
  const [filterByDinner, setFilterByDinner] = useState<true | false | null>(
    null,
  );

  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const { get } = useFetch();
  const errorSnack = useErrorSnack();

  const handleLogin = () => {
    // Simple hardcoded authentication for demo purposes
    if (
      loginUsername === "admin" &&
      loginPassword === CONSTANTS.secrets.consolePassword
    ) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  useTimeoutEffect(
    () => {
      if (!isLoggedIn) return;

      fetchRsvps();
    },
    [isLoggedIn],
    isLoggedIn ? 50 : 0,
  );

  const toggleTextLaterFilter = () => {
    setFilterByTextLater((prev) => {
      if (prev === null) return true;
      if (prev === true) return false;
      return null;
    });
  };

  const toggleComingFilter = () => {
    setFilterByComing((prev) => {
      if (prev === null) return true;
      if (prev === true) return false;
      return null;
    });
  };

  const toggleDinnerFilter = () => {
    setFilterByDinner((prev) => {
      if (prev === null) return true;
      if (prev === true) return false;
      return null;
    });
  };

  const fetchRsvps = async () => {
    setLoading(true);

    const res = await get<{ rsvps: RSVP[] }>(
      CONSTANTS.apiEndpoints.graduationRsvps + "/all",
    );

    if (res.err || !res.data) {
      console.log(`Error fetching RSVPs: ${res.err}`);
      errorSnack("Failed to fetch RSVPs.", true, false);
    } else {
      setRsvps(res.data.rsvps);
    }
    setLoading(false);
  };

  const filteredRsvps = rsvps.filter(
    (rsvp) =>
      (searchTerm === "" ||
        rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rsvp.familySide.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rsvp.guestList.some((guest) =>
          guest.toLowerCase().includes(searchTerm.toLowerCase()),
        )) &&
      (selectedFamilySide === "" || rsvp.familySide === selectedFamilySide) &&
      (filterByTextLater === null ||
        rsvp.keepInContact === filterByTextLater) &&
      (filterByComing === null || rsvp.isComing === filterByComing) &&
      (filterByDinner === null || rsvp.attendingDinner === filterByDinner),
  );

  // Show login form if not logged in
  if (!isLoggedIn) {
    return (
      <div
        className={`flex column bg-secondary color-primary pv-50 ${
          ltSmall ? "ph-15" : "ph-100"
        }`}
        style={{ minHeight: "100vh" }}
      >
        <div className="mb-50 text-center">
          <p className="fs-1 font-2 bold color-primary">Graduation Console</p>
          <p className="fs-3 mv-10 color-primary">Login Required</p>
        </div>

        <div className="flex center">
          <div
            style={{ width: "50%" }}
            className="rad-25 bg-primary p-50 center color-secondary"
          >
            <p className="fs-2 bold mb-30 text-center">Administrator Login</p>

            <div className="flex center">
              <div style={{ width: "80%" }} className="flex column ">
                <Input
                  dark
                  placeHolder="Username"
                  value={loginUsername}
                  onValueChange={setLoginUsername}
                />

                <div className="mv-20">
                  <Input
                    dark
                    type="password"
                    placeHolder="Password"
                    value={loginPassword}
                    onValueChange={setLoginPassword}
                  />
                </div>

                {loginError && (
                  <p className="fs-4 color-accent text-center mb-20">
                    {loginError}
                  </p>
                )}

                <TextButton
                  onPress={handleLogin}
                  buttonColor="#944bbb"
                  color="#FFFFFF"
                  text="Login"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={`flex center color-primary bg-secondary pv-50 ${
          ltSmall ? "ph-15" : "ph-100"
        }`}
        style={{ minHeight: "100vh" }}
      >
        <p className="fs-4">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className={`flex column bg-secondary color-primary pv-50 ${
        ltSmall ? "ph-15" : "ph-100"
      }`}
      style={{ minHeight: "100vh" }}
    >
      <div className="mb-50 text-center">
        <p className="fs-1 font-2 bold color-primary">Graduation Console</p>
        <p className="fs-3 mv-10 color-primary">RSVP Dashboard</p>
      </div>

      <div className="rad-25 bg-primary p-50 mw-1200 center color-secondary">
        <p className="fs-2 bold mb-30 text-center">RSVP Management</p>

        <div className="mb-30">
          <div className="mb-20">
            <Input
              dark
              placeHolder="Search RSVPs by name, family side, or guest..."
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
          </div>
          <div
            className="width-100 flex row ai-end space-between"
            style={{ gap: "14px" }}
          >
            <div className="flex row" style={{ flexGrow: 1, gap: "14px" }}>
              <div style={{ width: "25%" }}>
                <TextButton
                  text={
                    filterByComing === null
                      ? "All"
                      : filterByComing === true
                        ? "Coming"
                        : "Not Coming"
                  }
                  buttonColor={
                    filterByComing === null || filterByComing === true
                      ? "#944bbb"
                      : "#000000"
                  }
                  color={
                    filterByComing === null
                      ? "#FFFFFF"
                      : filterByComing === true
                        ? "#944bbb"
                        : "#000000"
                  }
                  outline={filterByComing === null ? false : true}
                  onPress={toggleComingFilter}
                />
              </div>

              <div style={{ width: "25%" }}>
                <TextButton
                  text={
                    filterByDinner === null
                      ? "All"
                      : filterByDinner === true
                        ? "Dinner"
                        : "No Dinner"
                  }
                  buttonColor={
                    filterByDinner === null || filterByDinner === true
                      ? "#944bbb"
                      : "#000000"
                  }
                  color={
                    filterByDinner === null
                      ? "#FFFFFF"
                      : filterByDinner === true
                        ? "#944bbb"
                        : "#000000"
                  }
                  outline={filterByDinner === null ? false : true}
                  onPress={toggleDinnerFilter}
                />
              </div>

              <div style={{ width: "25%" }}>
                <TextButton
                  text={
                    filterByTextLater === null
                      ? "All"
                      : filterByTextLater === true
                        ? "Text"
                        : "Dont Text"
                  }
                  buttonColor={
                    filterByTextLater === null || filterByTextLater === true
                      ? "#944bbb"
                      : "#000000"
                  }
                  color={
                    filterByTextLater === null
                      ? "#FFFFFF"
                      : filterByTextLater === true
                        ? "#944bbb"
                        : "#000000"
                  }
                  outline={filterByTextLater === null ? false : true}
                  onPress={toggleTextLaterFilter}
                />
              </div>
            </div>

            <div style={{ width: "25%" }}>
              <Select
                dark
                placeHolder="Filter by Family Side"
                value={selectedFamilySide}
                onValueChange={setSelectedFamilySide}
                options={FAMILY_SIDE_OPTIONS}
              />
            </div>
          </div>
        </div>

        <div className="overflow-auto">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid var(--secondary)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "var(--accent)" }}>
                <th
                  style={{
                    border: "1px solid var(--secondary)",
                    padding: "12px",
                    color: "var(--primary)",
                    fontWeight: "bold",
                  }}
                >
                  Coming To
                </th>

                <th
                  style={{
                    border: "1px solid var(--secondary)",
                    padding: "12px",
                    color: "var(--primary)",
                    fontWeight: "bold",
                    maxWidth: "25%",
                    width: "20%",
                  }}
                >
                  Name
                </th>

                <th
                  style={{
                    border: "1px solid var(--secondary)",
                    padding: "12px",
                    color: "var(--primary)",
                    fontWeight: "bold",
                  }}
                >
                  Family Side
                </th>

                <th
                  style={{
                    border: "1px solid var(--secondary)",
                    padding: "12px",
                    color: "var(--primary)",
                    fontWeight: "bold",
                  }}
                >
                  Text Later
                </th>

                <th
                  style={{
                    border: "1px solid var(--secondary)",
                    padding: "12px",
                    color: "var(--primary)",
                    fontWeight: "bold",
                  }}
                >
                  Phone #
                </th>

                <th
                  style={{
                    border: "1px solid var(--secondary)",
                    padding: "12px",
                    color: "var(--primary)",
                    fontWeight: "bold",
                    width: "45%",
                    minWidth: "35%",
                  }}
                >
                  Guest List
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRsvps.map((rsvp, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "var(--primary)" : "#f9f9f9",
                  }}
                >
                  <td
                    className="text-center"
                    style={{
                      border: "1px solid var(--secondary)",
                      padding: "12px",
                    }}
                  >
                    <p>
                      {rsvp.isComing
                        ? rsvp.attendingDinner
                          ? "Graduation & Dinner"
                          : "Graduation"
                        : "Not Coming"}
                    </p>
                  </td>

                  <td
                    className="text-center"
                    style={{
                      border: "1px solid var(--secondary)",
                      padding: "12px",
                    }}
                  >
                    {rsvp.name}
                  </td>

                  <td
                    className="text-center"
                    style={{
                      border: "1px solid var(--secondary)",
                      padding: "12px",
                    }}
                  >
                    {rsvp.familySide}
                  </td>

                  <td
                    className="text-center"
                    style={{
                      border: "1px solid var(--secondary)",
                      padding: "12px",
                    }}
                  >
                    {rsvp.keepInContact ? "Yes" : "No"}
                  </td>

                  <td
                    className="text-center"
                    style={{
                      border: "1px solid var(--secondary)",
                      padding: "12px",
                    }}
                  >
                    {rsvp.phone}
                  </td>

                  <td
                    className={rsvp.guestList.length === 0 ? "text-center" : ""}
                    style={{
                      border: "1px solid var(--secondary)",
                      padding: "12px",
                    }}
                  >
                    {rsvp.guestList.length === 0 && <span>No guests</span>}
                    {rsvp.guestList.length > 0 && (
                      <>
                        <p className="bold">Bringing: {rsvp.numBringing - 1}</p>
                        {rsvp.guestList.map((guest, idx) => (
                          <p key={idx}>&nbsp;&nbsp;{guest}</p>
                        ))}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex jc-end mt-20">
          <TextButton
            disabled={loading}
            onPress={fetchRsvps}
            buttonColor="#944bbb"
            color="#FFFFFF"
            text={loading ? "Loading..." : "↻ Reload"}
          />
        </div>

        {filteredRsvps.length === 0 && (
          <p className="fs-3 text-center mt-30 color-secondary">
            No RSVPs found matching your search.
          </p>
        )}

        <p className="fs-4 text-center mt-30 color-secondary">
          Total RSVPs: {rsvps.length}
        </p>
      </div>
    </div>
  );
};
