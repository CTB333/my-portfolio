import { useCallback, useState } from "react";
import {
  CircularPageCutout,
  CodingCapabilities,
  ComixImages,
  FalkonerImages,
  FlipGPTImages,
  HeroSection,
  HomeLeftHero,
  HomeProjectHeading,
  HomeRightHero,
  PortfolioImages,
  ProjectSection,
  ProjectSnippet,
  TechStackModal,
  TransciribiaImages,
} from "../components";
import { LANGUAGES } from "../constants";
import HomeFooterCTA from "../components/HomeFooterCTA";
import { useNavigate } from "react-router-dom";
import Modal from "react-responsive-modal";
import { useOpen, useScrollToTop } from "../hooks";
import { useScreenSize } from "../providers";
import { motion } from "framer-motion";

const FlipTechStack = [11, 8, 9, 14, 6, 2];
const ComixTechStack = [5, 12];
const TranscribiaTechStack = [10, 11, 13, 14];
const FalkonerTechStack = [1, 5, 6];
const PortfolioTechStack = [11];

type SelectedModals = "FlipGPT" | "Transcribia" | "Falkoner";

const useHomePage = () => {
  const navigate = useNavigate();
  const { isOpen, open, close } = useOpen();

  useScrollToTop();

  const [modal, setModal] = useState<SelectedModals>("FlipGPT");
  const allModalProps = {
    FlipGPT: FlipTechStack,
    Transcribia: TranscribiaTechStack,
    Falkoner: FalkonerTechStack,
  };
  const modalProps = {
    title: modal,
    language: allModalProps[modal],
  };

  const getLanguages = useCallback(
    (mapping: number[]) =>
      mapping.map((id) => LANGUAGES.find((lang) => lang.id === id)!),
    []
  );

  const toContact = () => navigate("/contact");
  const toJefferyColin = () => {
    const newWindow = window.open(
      "https://www.jeffreymcolin.com/",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  const selectModal = (selected: SelectedModals) => {
    setModal(selected);
    open();
  };

  return {
    isOpen,
    modalProps,
    selectModal,
    toContact,
    toJefferyColin,
    getLanguages,
    close,
  };
};

export const Home = () => {
  const {
    isOpen,
    modalProps,
    getLanguages,
    toContact,
    toJefferyColin,
    selectModal,
    close,
  } = useHomePage();

  const { ltSmall, allMedium, ltMedSmall } = useScreenSize();

  const ComixText = useCallback(
    () => (
      <ProjectSnippet
        title="Comix"
        desc="Comix leveraged 7 software design patterns to build a virtual library tracking system. Working in an agile team environment we created a cohesive and highly accessible CLI system that could also export and import its data from and to multiple different formats."
        techStack={getLanguages(ComixTechStack)}
      />
    ),
    [getLanguages]
  );

  const FalkonerText = useCallback(
    () => (
      <ProjectSnippet
        onPress={() => selectModal("Falkoner")}
        title="Falkoner"
        desc="My introduction to working within agile environments, my team and I created an e-services platform with basic authentication and administration capabilities centered around falconry."
        techStack={getLanguages(FalkonerTechStack)}
      />
    ),
    [getLanguages, selectModal]
  );

  const PortfolioText = useCallback(
    () => (
      <ProjectSnippet
        onPress={toJefferyColin}
        title="Portfolio Website"
        desc="Working closely with a UX designer to bring their passion to life. We created a pixel perfect copy of their original design and deployed earlier than expected."
        techStack={getLanguages(PortfolioTechStack)}
      />
    ),
    [getLanguages, toJefferyColin]
  );

  return (
    <div className={`bg-primary`}>
      <div className="bg-secondary">
        <HeroSection
          left={
            allMedium ? (
              <HomeRightHero />
            ) : (
              <HomeLeftHero toContact={toContact} />
            )
          }
          right={
            ltSmall ? undefined : allMedium ? (
              <HomeLeftHero toContact={toContact} />
            ) : (
              <HomeRightHero />
            )
          }
        />

        <HomeProjectHeading />
      </div>

      {ltMedSmall ? <div className="pt-50" /> : null}

      <ProjectSection
        left={<FlipGPTImages />}
        right={
          <ProjectSnippet
            onPress={() => selectModal("FlipGPT")}
            title={"Flip GPT"}
            desc={
              "An A.I assisted learning tool for students built with the intention of becoming a subscription based service. I led a small team on this project to build this application for a hackathon at RIT."
            }
            techStack={getLanguages(FlipTechStack)}
          />
        }
      />

      <ProjectSection
        left={ltMedSmall ? <ComixImages /> : <ComixText />}
        right={ltMedSmall ? <ComixText /> : <ComixImages />}
      />

      <CodingCapabilities />

      <ProjectSection
        left={<TransciribiaImages />}
        right={
          <ProjectSnippet
            onPress={() => selectModal("Transcribia")}
            title="Transcribia"
            desc="Leveraging 7 AWS services Transcribia allows any readable content to be consumed easily in an audible format or alternate language. I led a small team as we got familiar with Dev-Ops practices."
            techStack={getLanguages(TranscribiaTechStack)}
          />
        }
      />

      <ProjectSection
        left={ltMedSmall ? <FalkonerImages /> : <FalkonerText />}
        right={ltMedSmall ? <FalkonerText /> : <FalkonerImages />}
      />

      <motion.div initial={{ y: 10 }}>
        <CircularPageCutout />
      </motion.div>

      <div className="bg-secondary color-primary">
        <p className="fs-2 bold color-primary text-center pt-25 mb-100">
          Proffesional Experience
        </p>

        <ProjectSection
          left={ltMedSmall ? <PortfolioImages /> : <PortfolioText />}
          right={ltMedSmall ? <PortfolioText /> : <PortfolioImages />}
        />

        <HomeFooterCTA onPress={toContact} />

        <div className="pt-100" />
      </div>

      <Modal
        classNames={{
          modalContainer: "flex center",
          modal: "rad-20 bg-primary",
        }}
        styles={{
          modal: {
            width: ltMedSmall ? "75%" : "50%",
            height: ltSmall ? "75vh" : "50vh",
          },
        }}
        showCloseIcon={false}
        open={isOpen}
        onClose={close}
      >
        <TechStackModal
          title={modalProps.title}
          techStack={getLanguages(modalProps.language)}
        />
      </Modal>
    </div>
  );
};
