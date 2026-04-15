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
  numBringing: number;
  guestList: string[];
  familySide: string;
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

      const fetchRsvps = async () => {
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

      fetchRsvps();
    },
    [isLoggedIn],
    isLoggedIn ? 50 : 0,
  );

  const filteredRsvps = rsvps.filter(
    (rsvp) =>
      (searchTerm === "" ||
        rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rsvp.familySide.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rsvp.guestList.some((guest) =>
          guest.toLowerCase().includes(searchTerm.toLowerCase()),
        )) &&
      (selectedFamilySide === "" || rsvp.familySide === selectedFamilySide),
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
          <div className="width-100 flex row jc-end">
            <div style={{ width: "35%" }}>
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
                    width: "20%",
                  }}
                >
                  # of People Joining
                </th>
                <th
                  style={{
                    border: "1px solid var(--secondary)",
                    padding: "12px",
                    color: "var(--primary)",
                    fontWeight: "bold",
                    width: "45%",
                  }}
                >
                  Guest List
                </th>

                <th
                  style={{
                    border: "1px solid var(--secondary)",
                    padding: "12px",
                    color: "var(--primary)",
                    fontWeight: "bold",
                    width: "15%",
                  }}
                >
                  Family Side
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
                    {rsvp.name}
                  </td>
                  <td
                    className="text-center"
                    style={{
                      border: "1px solid var(--secondary)",
                      padding: "12px",
                    }}
                  >
                    {rsvp.numBringing}
                  </td>
                  <td
                    className="text-center"
                    style={{
                      border: "1px solid var(--secondary)",
                      padding: "12px",
                      textAlign: "center",
                    }}
                  >
                    {rsvp.guestList.length > 0
                      ? rsvp.guestList.join(", ")
                      : "None"}
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
                </tr>
              ))}
            </tbody>
          </table>
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
