import { useScrollToTop } from "../hooks";
import { useScreenSize } from "../providers";
import { useNavigate } from "react-router-dom";
import { TextButton } from "../components";

interface Event {
  time: string;
  title: string;
  location: string;
  googleMapQuery: string;
}

const EVENTS: Event[] = [
  {
    time: "9:00 AM - 11:00 AM",
    title: "Reception",
    location: "CYB - Room 1710/20/30",
    googleMapQuery: "CYB Building RIT Rochester NY",
  },
  {
    time: "10:00 AM - 11:00 AM",
    title: "Order of the Engineer Ceremony",
    location: "GCCIS - Room 1400",
    googleMapQuery: "GCCIS Building RIT Rochester NY",
  },
  {
    time: "12:30 PM - 3:00 PM",
    title: "Graduation Ceremony",
    location: "Gordon Field House and Activities Center (GOR)",
    googleMapQuery: "Gordon Field House RIT Rochester NY",
  },
];

const EventMap = ({ query }: { query: string }) => (
  <div
    className="rad-20 overflow-hidden bg-secondary"
    style={{ minHeight: 300 }}
  >
    <iframe
      title={`Map for ${query}`}
      width="100%"
      height="100%"
      className="rad-20"
      style={{ border: 0, minHeight: 300 }}
      loading="lazy"
      src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
    />
  </div>
);

const EventCard = ({
  event,
  mapOnRight,
}: {
  event: Event;
  mapOnRight: boolean;
}) => {
  const { ltSmall } = useScreenSize();
  const direction = ltSmall ? "column" : mapOnRight ? "row" : "row-reverse";
  const spacingClass = ltSmall ? "mt-30" : mapOnRight ? "ml-20" : "mr-20";

  return (
    <div className={`mb-${ltSmall ? "20" : "40"}`}>
      <div
        className={`rad-20 bg-secondary p-${ltSmall ? "20" : "40"} color-primary flex ${direction} ai-stretch space`}
      >
        <div className="flex-1 flex column jc-center">
          <p className="fs-2 bold mb-20">{event.title}</p>
          <p className="fs-3 bold mb-15 color-accent">{event.time}</p>
          <p className="fs-4">{event.location}</p>
        </div>
        <div className={`flex-1 ${spacingClass}`}>
          <EventMap query={event.googleMapQuery} />
        </div>
      </div>
    </div>
  );
};

export const GraduationInvite = () => {
  useScrollToTop();
  const navigate = useNavigate();

  const { ltSmall } = useScreenSize();

  return (
    <div
      className={`flex column bg-secondary color-primary pv-50 ${ltSmall ? "ph-15" : "ph-100"}`}
    >
      <div className={`mb-${ltSmall ? "30" : "50"} text-center`}>
        <p className="fs-1 font-2 bold color-primary">Graduation Invitation</p>
        <p className="fs-3 mv-10">Saturday, May 9, 2026</p>
      </div>

      <div
        className={`mb-${ltSmall ? "30" : "50"} rad-25 bg-secondary p-${ltSmall ? "30" : "50"}`}
      >
        <div
          className={`flex ${ltSmall ? "column" : "row space"} mb-${ltSmall ? "" : "50"}`}
        >
          <div className={`flex-1 ${ltSmall ? "mb-20" : "mr-30"}`}>
            <div
              className={`rad-20 bg-primary p-${ltSmall ? "20" : "40"} color-secondary`}
            >
              <p className="fs-2 bold mb-15 color-accent text-center">
                Event Details
              </p>
              <p className="mb-10">
                <b>Date</b>: Saturday, May 9, 2026
              </p>
              <p className="mb-10">Multiple events throughout the day</p>
              <p className="mb-10">
                At various locations across <b>RIT campus</b> in Rochester, NY
              </p>
            </div>
          </div>

          <div className={`flex-1 ${ltSmall ? "mb-20" : ""}`}>
            <div
              className={`rad-20 bg-primary p-${ltSmall ? "20" : "40"} color-secondary`}
            >
              <p className="fs-2 bold mb-15 color-accent text-center">RSVP</p>
              <p className="mb-10">
                Please let us know if you will attend. We look forward to
                celebrating together.
              </p>
              <p className="mb-20">
                Bring your best memories, family, and friends.
              </p>
              <TextButton
                onPress={() => navigate("/graduation/rsvp")}
                buttonColor="#944bbb"
                color="#FFFFFF"
                text="RSVP Now"
              />
            </div>
          </div>
        </div>

        <EventMap query="1 Lomb Memorial Dr Rochester NY 14586" />
      </div>

      <div className={`rad-25 bg-primary p-${ltSmall ? "30" : "50"}`}>
        <div className={`mb-${ltSmall ? "30" : "50"} text-center`}>
          <p className="fs-2 bold color-secondary">Event Schedule</p>
        </div>

        {EVENTS.map((event, index) => (
          <EventCard key={index} event={event} mapOnRight={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
};
